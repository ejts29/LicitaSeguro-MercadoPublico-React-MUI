// src/Pages/DetalleLicitacion.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Divider,
  Button,
  Alert,
  Chip,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import axios from "axios";

// Tarjetas simuladas para cuando no se puede obtener datos de la API real
const tarjetasSimuladas = [
  {
    Nombre: "Licitación Simulada 1",
    CodigoExterno: "0001-23-LE25",
    Estado: "publicada",
    FechaCierre: "2025-07-10",
    MontoEstimado: 1500000,
    Descripcion: "Esta es una descripción de la licitación simulada 1.",
    Comprador: {
      NombreOrganismo: "Organismo Simulado A",
      RutUnidad: "76123456-7",
      DireccionUnidad: "Calle Falsa 123, Ciudad Ficticia",
    },
    Items: {
      Listado: [
        {
          NombreProducto: "Servicio Simulado X",
          Cantidad: 1,
          UnidadMedida: "unidad",
          Adjudicacion: {
            NombreProveedor: "Proveedor Simulado Alpha",
            RutProveedor: "77888999-0",
            MontoUnitario: 1500000,
          },
        },
      ],
    },
  },
  {
    Nombre: "Licitación Simulada 2",
    CodigoExterno: "0002-23-LE25",
    Estado: "cerrada",
    FechaCierre: "2025-07-12",
    MontoEstimado: 800000,
    Descripcion: "Detalles para la licitación simulada 2.",
    Comprador: {
      NombreOrganismo: "Organismo Simulado B",
      RutUnidad: "76987654-3",
      DireccionUnidad: "Avenida Imaginaria 456, Pueblo Fantasma",
    },
    Items: {
      Listado: [],
    },
  },
  {
    Nombre: "Licitación Simulada 3",
    CodigoExterno: "0003-23-LE25",
    Estado: "adjudicada",
    FechaCierre: "2025-07-14",
    MontoEstimado: 2500000,
    Descripcion: "Licitación simulada 3 con adjudicación.",
    Comprador: {
      NombreOrganismo: "Organismo Simulado C",
      RutUnidad: "76543210-9",
      DireccionUnidad: "Plaza Central 789, Metrópolis de Ensueño",
    },
    Items: {
      Listado: [
        {
          NombreProducto: "Producto Simulado Y",
          Cantidad: 5,
          UnidadMedida: "piezas",
          Adjudicacion: {
            NombreProveedor: "Proveedor Simulado Beta",
            RutProveedor: "78111222-3",
            MontoUnitario: 500000,
          },
        },
        {
          NombreProducto: "Servicio Simulado Z",
          Cantidad: 1,
          UnidadMedida: "servicio",
          Adjudicacion: {
            NombreProveedor: "Proveedor Simulado Beta",
            RutProveedor: "78111222-3",
            MontoUnitario: 1000000,
          },
        },
      ],
    },
  },
];

// Mapeo de colores por estado
const estadoColor = {
  publicada: "success",
  cerrada: "default",
  adjudicada: "info",
  revocada: "warning",
  desierta: "error",
  suspendida: "warning",
};

export default function DetalleLicitacion() {
  const { codigo } = useParams();  // Obtiene el código de la licitación desde los parámetros de la URL
  const [licitacion, setLicitacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [proveedor, setProveedor] = useState(null);
  const [apiSimulada, setApiSimulada] = useState(false);

  // Función para formatear el monto en formato CLP
  const formatMonto = (valor) => {
    if (valor === null || valor === undefined || isNaN(valor))
      return "No disponible";  // Verifica si el monto es válido
    return `$ ${Number(valor).toLocaleString("es-CL")} CLP`;  // Formatea el monto con separadores de miles
  };

  // Función para formatear la fecha de la licitación
  const formatFecha = (fecha) => {
    if (!fecha) return "No disponible";  // Si no hay fecha, muestra "No disponible"
    const d = new Date(fecha);  // Convierte la fecha a un objeto Date
    return isNaN(d.getTime()) ? "Fecha no válida" : d.toLocaleDateString("es-CL");  // Verifica si la fecha es válida
  };

  useEffect(() => {
    const obtenerDetalle = async () => {
      setLoading(true);
      setError(null);
      setApiSimulada(false);

      try {
        const res = await axios.get(`http://localhost:3001/api/licitacion/${codigo}`);  // Petición a la API
        setLicitacion(res.data);  // Si la API devuelve la licitación, se establece en el estado

        const rut = res.data?.Items?.Listado?.[0]?.Adjudicacion?.RutProveedor;  // Obtiene el RUT del proveedor
        if (rut) {
          const proveedorRes = await axios.get(`http://localhost:3001/api/proveedor/${rut}`);  // Petición para obtener datos del proveedor
          setProveedor(proveedorRes.data);  // Establece los datos del proveedor
        }
      } catch (err) {
        setError("Error al cargar detalle. Intentando con datos simulados.");
        console.error("Error al cargar detalle de la API real:", err);
        setApiSimulada(true);  // Activa el modo de simulación en caso de error

        // Si no se puede obtener datos reales, usa datos simulados
        const simulatedLicitacion = tarjetasSimuladas.find(
          (tarjeta) => tarjeta.CodigoExterno === codigo
        );
        if (simulatedLicitacion) {
          setLicitacion(simulatedLicitacion);  // Establece los datos simulados
          const rutSimulado = simulatedLicitacion?.Items?.Listado?.[0]?.Adjudicacion?.RutProveedor;
          if (rutSimulado) {
            setProveedor({ NombreFantasia: "Proveedor Simulado", Rut: rutSimulado });
          } else {
            setProveedor(null);
          }
        } else {
          setError("Error: Licitación no encontrada en la API real ni en los datos simulados.");
          setLicitacion(null);
        }
      } finally {
        setLoading(false);
      }
    };

    obtenerDetalle();  // Llama a la función para obtener los detalles
  }, [codigo]);  // Dependencia de la URL para obtener el código de la licitación

  // Si está cargando, se muestra un indicador de progreso
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Si ocurre un error y no se encuentran datos de la licitación, se muestra un mensaje de error
  if (error && !licitacion) {
    return (
      <Alert severity="error" sx={{ m: 3 }}>
        ⚠️ {error}
      </Alert>
    );
  }

  // Si no se encuentra la licitación con el código proporcionado, se muestra un mensaje de advertencia
  if (!licitacion) {
    return (
      <Alert severity="warning" sx={{ m: 3 }}>
        No se encontraron detalles para la licitación con código: {codigo}.
      </Alert>
    );
  }

  return (
    <Container sx={{ py: 3 }}>
      {/* Mostrar estado de la API */}
      {apiSimulada ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          API simulada: Mostrando datos de prueba.
        </Alert>
      ) : (
        <Alert severity="info" sx={{ mb: 3 }}>
          Consumiendo la API real.
        </Alert>
      )}

      {/* Información de la licitación */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Detalle de Licitación
        </Typography>
        <Button component={Link} to="/licitaciones" variant="outlined" size="small">
          ← Volver al listado
        </Button>
      </Box>

      {/* Información General de la Licitación */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Información General
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              <strong>Código:</strong> {licitacion.CodigoExterno || "No disponible"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              <strong>Nombre:</strong> {licitacion.Nombre || "No disponible"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              <strong>Estado:</strong>
            </Typography>
            {licitacion.Estado ? (
              <Chip
                label={licitacion.Estado}
                color={estadoColor[licitacion.Estado?.toLowerCase()] || "default"}
                size="small"
                sx={{ textTransform: "capitalize", mt: 1 }}
              />
            ) : (
              <Typography variant="body2">No disponible</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              <strong>Fecha de Cierre:</strong> {formatFecha(licitacion.Fechas?.FechaCierre || licitacion.FechaCierre)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              <strong>Monto Estimado:</strong> {formatMonto(licitacion.MontoEstimado)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Descripción:</strong> {licitacion.Descripcion || "No disponible"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Información del Comprador */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Comprador
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              <strong>Nombre del organismo:</strong>{" "}
              {licitacion.Comprador?.NombreOrganismo || "No especificado"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              <strong>RUT Unidad:</strong> {licitacion.Comprador?.RutUnidad || "No especificado"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              <strong>Dirección:</strong>{" "}
              {licitacion.Comprador?.DireccionUnidad || "No especificado"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Ítems Adjudicados */}
      {licitacion.Items?.Listado?.length > 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Ítems Adjudicados
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={3}>
            {licitacion.Items.Listado.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ p: 3 }}>
                  <CardContent>
                    <Typography variant="body1">
                      <strong>Producto:</strong> {item.NombreProducto || "No disponible"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Cantidad:</strong> {item.Cantidad || "No disponible"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Unidad:</strong> {item.UnidadMedida || "No disponible"}
                    </Typography>
                    {item.Adjudicacion && (
                      <>
                        <Typography variant="body2">
                          <strong>Proveedor:</strong> {item.Adjudicacion.NombreProveedor || "No disponible"}
                        </Typography>
                        <Typography variant="body2">
                          <strong>RUT:</strong> {item.Adjudicacion.RutProveedor || "No disponible"}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Monto unitario:</strong>{" "}
                          {formatMonto(item.Adjudicacion.MontoUnitario)}
                        </Typography>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {/* Detalle del Proveedor Adjudicado */}
      {proveedor && !apiSimulada && (
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Detalle del Proveedor Adjudicado
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body1">
                <strong>RUT Proveedor:</strong> {proveedor.Rut || "No disponible"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body1">
                <strong>Nombre Fantasía:</strong> {proveedor.NombreFantasia || "No disponible"}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Container>
  );
}
