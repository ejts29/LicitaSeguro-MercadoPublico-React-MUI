// src/Pages/Proveedores.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Alert,
  Paper,
  CircularProgress,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";

function Proveedores() {
  // Estados para manejar los valores del RUT, proveedor, error, fecha de creación y carga
  const [rut, setRut] = useState("");
  const [proveedor, setProveedor] = useState(null);
  const [error, setError] = useState(null);
  const [fechaCreacion, setFechaCreacion] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [loading, setLoading] = useState(false);

  // Función para limpiar el formato del RUT (eliminando caracteres no numéricos y la 'k' o 'K')
  const limpiarFormatoRut = (rut) => rut.replace(/[^0-9kK]/g, "");

  // Función para formatear el RUT (agrega los puntos y el guion)
  const formatearRut = (rut) => {
    const clean = limpiarFormatoRut(rut);
    if (clean.length < 2) return clean;
    const cuerpo = clean.slice(0, -1);
    const dv = clean.slice(-1);
    const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${cuerpoFormateado}-${dv}`;
  };

  // Función de validación del RUT (verifica si el RUT es válido según el dígito verificador)
  const validarRut = (rut) => {
    const clean = limpiarFormatoRut(rut).toLowerCase();
    if (clean.length < 2) return false;

    const cuerpo = clean.slice(0, -1);
    const dv = clean.slice(-1);

    let suma = 0,
      multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo[i]) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    const verificador = 11 - (suma % 11);
    const dvEsperado =
      verificador === 11 ? "0" : verificador === 10 ? "k" : verificador.toString();
    return dv === dvEsperado;
  };

  // Función para buscar el proveedor por su RUT
  const buscarProveedor = async () => {
    setError(null);  // Reinicia cualquier error anterior
    setProveedor(null);  // Reinicia los datos del proveedor
    setLoading(true);  // Comienza el proceso de carga

    try {
      const rutLimpio = limpiarFormatoRut(rut);
      if (!validarRut(rutLimpio)) throw new Error("RUT inválido.");

      // Realiza la solicitud al servidor backend para buscar el proveedor
      const response = await fetch(
        `http://localhost:3001/api/proveedor/${rutLimpio}`
      );
      if (!response.ok) throw new Error("Proveedor no encontrado o error de red.");

      const data = await response.json();
      const empresa = data?.listaEmpresas?.[0];
      if (!empresa) throw new Error("No se encontraron datos del proveedor.");

      // Establece el proveedor y los datos de la respuesta
      setProveedor(empresa);
      setFechaCreacion(data.FechaCreacion || "-");
      setCantidad(data.Cantidad || 0);
    } catch (err) {
      setError(err.message);  // Establece el mensaje de error en caso de fallo
    } finally {
      setLoading(false);  // Finaliza el estado de carga
    }
  };

  // Maneja el cambio en el campo de entrada del RUT y lo formatea
  const handleRutChange = (e) => {
    const value = e.target.value;
    const formatted = formatearRut(value);
    setRut(formatted);  // Actualiza el estado del RUT con el valor formateado
  };

  return (
    <Container sx={{ py: 6 }}>
      {/* Título de la página */}
      <Typography variant="h4" gutterBottom align="center">
        Buscar Proveedor por RUT
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          maxWidth: 400,
          mx: "auto",
        }}
      >
        {/* Campo de entrada RUT con validación accesible */}
        <TextField
          label="RUT del proveedor"
          variant="outlined"
          fullWidth
          value={rut}
          onChange={handleRutChange}
          aria-label="Ingrese el RUT del proveedor"  // Mejora de accesibilidad para usuarios con lectores de pantalla
        />

        {/* Botón de búsqueda con lógica de habilitación/deshabilitación y retroalimentación de carga */}
        <Button
          variant="contained"
          color="primary"
          onClick={buscarProveedor}
          disabled={!rut.trim() || loading}  // Deshabilita el botón si el RUT está vacío o si hay una carga en curso
          sx={{
            bgcolor: '#0B3C5D',  // Mejor contraste para visibilidad
            '&:hover': { bgcolor: '#328CC1' },  // Cambio de color al pasar el mouse
          }}
          aria-label={`Buscar proveedor con RUT: ${rut}`}  // Mejora de accesibilidad
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Buscar"}  {/* Muestra el cargador mientras se realiza la búsqueda */}
        </Button>

        {/* Muestra el mensaje de error si ocurre algún problema */}
        {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}

        {/* Muestra los datos del proveedor si la búsqueda fue exitosa */}
        {proveedor && (
          <Paper elevation={3} sx={{ p: 4, mt: 3, width: "100%" }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <BusinessIcon color="primary" />
              <Typography variant="h6">
                {proveedor.NombreEmpresa || "Nombre no disponible"}
              </Typography>
            </Box>
            <Typography>
              <strong>RUT:</strong> {rut}
            </Typography>
            <Typography>
              <strong>Cantidad:</strong> {cantidad}
            </Typography>
            <Typography>
              <strong>Fecha de Creación:</strong>{" "}
              {new Date(fechaCreacion).toLocaleString()}
            </Typography>
            <Typography>
              <strong>Código Empresa:</strong> {proveedor.CodigoEmpresa || "-"}
            </Typography>
            <Typography>
              <strong>Nombre Empresa:</strong> {proveedor.NombreEmpresa || "-"}
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default Proveedores;
