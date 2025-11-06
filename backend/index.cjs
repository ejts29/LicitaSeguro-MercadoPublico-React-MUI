const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3001;
const TICKET = "AC3A098B-4CD0-41AF-81A5-41284248419B"; // Tu ticket real

app.use(cors());
app.use(express.json());

// Variable para controlar la última vez que se hizo una solicitud a la API externa
// Esto ayuda a evitar peticiones simultáneas o muy rápidas
let lastRequestTime = 0;
// Aumentamos el intervalo mínimo a 2 segundos (2000 ms)
const MIN_REQUEST_INTERVAL = 2000; // Mínimo 2 segundos (2000 ms) entre solicitudes a la API externa
const MAX_RETRIES = 3; // Número máximo de reintentos para la API externa
const RETRY_DELAY_MS = 2000; // Retardo entre reintentos (2 segundos)

/* --- Test Básico --- */
app.get("/api/test", (req, res) => {
    res.send("API LicitaSeguro está corriendo correctamente");
});

/* --- Endpoint contador para frontend --- */
app.get("/api/contador", (req, res) => {
    res.json({
        licitaciones: 887,
        proveedores: 1939,
        usuarios: 1231,
    });
});

// Función de utilidad para esperar un tiempo
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Función para hacer peticiones a la API de Mercado Público con control de tasa y reintentos
async function makeMercadoPublicoApiCall(url, retries = MAX_RETRIES) {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
        const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
        console.log(`Esperando ${waitTime}ms para evitar sobrecarga de API...`);
        await delay(waitTime);
    }

    lastRequestTime = Date.now(); // Actualizar el tiempo de la última solicitud

    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 500 && error.response?.data?.Codigo === 10500) {
            console.warn(`API de Mercado Público: Peticiones simultáneas detectadas. Reintentando (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})...`);
            if (retries > 0) {
                await delay(RETRY_DELAY_MS); // Esperar antes de reintentar
                return makeMercadoPublicoApiCall(url, retries - 1); // Reintentar
            }
        }
        throw error; // Relanzar el error si no es un error de concurrencia o si se agotaron los reintentos
    }
}


// Endpoint para obtener listado de licitaciones por fecha y estado
app.get('/api/licitaciones', async (req, res) => {
    const { fecha, estado } = req.query;

    // Validación básica
    if (!fecha || !estado) {
        return res.status(400).json({ error: 'Debes incluir parámetros "fecha" y "estado".' });
    }

    if (!/^\d{8}$/.test(fecha)) {
        return res.status(400).json({ error: 'La fecha debe tener el formato DDMMYYYY (ej: 11062025).' });
    }

    // Estado permitido (ej: adjudicada, publicada, etc.)
    const estadosPermitidos = ['publicada', 'cerrada', 'desierta', 'adjudicada', 'revocada', 'suspendida', 'activas', 'todos'];
    if (!estadosPermitidos.includes(estado.toLowerCase())) {
        return res.status(400).json({ error: `Estado inválido. Usa uno de: ${estadosPermitidos.join(', ')}` });
    }

    const url = `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha=${fecha}&estado=${estado}&ticket=${TICKET}`;

    try {
        const response = await makeMercadoPublicoApiCall(url);
        if (!response.data || !response.data.Listado || response.data.Listado.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron licitaciones con esos filtros.' });
        }

        res.json(response.data);
    } catch (error) {
        console.error(" Error al consultar la API externa:", error.message);
        res.status(500).json({ error: 'Ocurrió un error al consultar la API externa.' });
    }
});

// Obtener detalle de licitación por código
app.get("/api/licitacion/:codigo", async (req, res) => {
    try {
        const { codigo } = req.params;
        // Validar formato del código: Ahora permite cualquier número de dígitos en las primeras dos partes.
        // Ejemplo: 2669-126-L125 o 1057539-17-LR25
        if (!codigo || !/^\d+-\d+-[A-Za-z0-9]+$/.test(codigo)) {
            return res.status(400).json({ error: "Código de licitación inválido" });
        }

        const url = `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?codigo=${codigo}&ticket=${TICKET}`;
        
        const response = await makeMercadoPublicoApiCall(url);
        // La API de Mercado Público devuelve un array 'Listado' incluso para una sola licitación por código
        const licitacion = response.data?.Listado?.[0]; // Accede al primer elemento del Listado

        if (!licitacion) {
            // Si Listado está vacío o no se encontró la licitación
            return res.status(404).json({ error: "Licitación no encontrada" });
        }

        res.json(licitacion);
    } catch (error) {
        // Mejorar el log para ver el detalle completo del error de Axios
        if (axios.isAxiosError(error)) {
            console.error(
                " Error en /api/licitacion/:codigo al consultar API externa:",
                "Mensaje:", error.message,
                "URL:", error.config?.url,
                "Estado HTTP:", error.response?.status,
                "Datos de la respuesta:", error.response?.data
            );
        } else {
            console.error(" Error inesperado en /api/licitacion/:codigo:", error);
        }
        res.status(500).json({ error: "Error obteniendo detalle de licitación" });
    }
});

/* --- Buscar proveedor por RUT --- */
app.get("/api/proveedor/:rut", async (req, res) => {
    try {
        const { rut } = req.params;

        //  Limpieza básica
        const rutLimpio = rut.replace(/[^0-9kK]/g, "");
        if (rutLimpio.length < 2) {
            return res.status(400).json({ error: "RUT inválido" });
        }

        //  Formatear como 77.596.940-7
        const cuerpo = rutLimpio.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        const dv = rutLimpio.slice(-1).toUpperCase();
        const rutFormateado = `${cuerpo}-${dv}`;

        const url = `https://api.mercadopublico.cl/servicios/v1/Publico/Empresas/BuscarProveedor?rutempresaproveedor=${rutFormateado}&ticket=${TICKET}`;
        console.log(" Consultando proveedor:", rutFormateado);

        const response = await makeMercadoPublicoApiCall(url);

        const { Cantidad, FechaCreacion, listaEmpresas } = response.data;

        if (!listaEmpresas || listaEmpresas.length === 0) {
            return res.status(404).json({ error: "Proveedor no encontrado" });
        }

        res.json({ Cantidad, FechaCreacion, listaEmpresas });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(
                " Error en /api/proveedor/:rut al consultar API externa:",
                "Mensaje:", error.message,
                "URL:", error.config?.url,
                "Estado HTTP:", error.response?.status,
                "Datos de la respuesta:", error.response?.data
            );
        } else {
            console.error(" Error inesperado en /api/proveedor/:rut:", error);
        }
        res.status(500).json({ error: "Error obteniendo datos del proveedor" });
    }
});

/* --- Iniciar servidor --- */
app.listen(PORT, () => {
    console.log(` Servidor backend corriendo en http://localhost:${PORT}`);
});