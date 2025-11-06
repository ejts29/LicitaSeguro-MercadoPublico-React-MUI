// src/Pages/ListadoLicitaciones.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Card,
  CardContent,
  Button,
  CardActions,
  Chip,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const estadoMap = {
  1: 'publicada',
  2: 'cerrada',
  3: 'desierta',
  4: 'adjudicada',
  5: 'revocada',
  6: 'suspendida',
  8: 'publicada',
};

function ListadoLicitaciones() {
  // Estados locales para manejar los valores de las licitaciones, fecha, estado, errores y carga
  const [licitaciones, setLicitaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(dayjs().subtract(2, 'day')); // Establecer una fecha inicial
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('publicada');
  const [apiSimulada, setApiSimulada] = useState(false);

  const ESTADOS_VALIDOS = ['publicada', 'cerrada', 'adjudicada', 'revocada', 'desierta', 'suspendida'];

  useEffect(() => {
    const fetchLicitaciones = async () => {
      setLoading(true);
      setError(null);
      setApiSimulada(false); // Indicamos que no estamos usando la API simulada por defecto
      const fechaAPI = dayjs(fechaSeleccionada).format('DDMMYYYY'); // Formato de fecha

      try {
        // Realizar la solicitud a la API
        const res = await fetch(
          `http://localhost:3001/api/licitaciones?fecha=${fechaAPI}&estado=${estadoSeleccionado}`
        );
        if (!res.ok) {
          throw new Error('Error al obtener licitaciones');
        }

        const data = await res.json();
        const listado = data?.Listado || []; // Obtenemos el listado de licitaciones
        const licitacionesConEstado = listado.map((licitacion) => ({
          ...licitacion,
          Estado: estadoMap[licitacion.CodigoEstado] || 'desconocido', // Mapear estado a nombre legible
        }));

        setLicitaciones(licitacionesConEstado); // Establecer el listado de licitaciones
      } catch (err) {
        setError(err.message); // Establecer error en caso de fallo
        setApiSimulada(true); // Si ocurre un error, activamos el modo API simulada
      } finally {
        setLoading(false); // Finalizar estado de carga
      }
    };

    fetchLicitaciones(); // Ejecutar la función para obtener las licitaciones
  }, [fechaSeleccionada, estadoSeleccionado]);

  // Tarjetas simuladas en caso de error con la API
  const tarjetasSimuladas = [
    {
      Nombre: 'Licitación Simulada 1',
      CodigoExterno: '0001-23-LE25',
      Estado: 'publicada',
      FechaCierre: '2025-07-10',
    },
    {
      Nombre: 'Licitación Simulada 2',
      CodigoExterno: '0002-23-LE25',
      Estado: 'cerrada',
      FechaCierre: '2025-07-12',
    },
    {
      Nombre: 'Licitación Simulada 3',
      CodigoExterno: '0003-23-LE25',
      Estado: 'adjudicada',
      FechaCierre: '2025-07-14',
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Licitaciones Disponibles
      </Typography>

      {/* Mostrar estado de la API (real o simulada) */}
      {apiSimulada ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          API simulada: Mostrando datos de prueba.
        </Alert>
      ) : (
        <Alert severity="info" sx={{ mb: 3 }}>
          Consumiendo la API real.
        </Alert>
      )}

      {/* Filtros para fecha y estado */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {/* Selector de fecha */}
        <DatePicker
          label="Selecciona una fecha"
          value={fechaSeleccionada}
          onChange={(newDate) => {
            if (newDate && dayjs(newDate).isValid()) {
              setFechaSeleccionada(newDate);
            }
          }}
          format="DD-MM-YYYY"
          slotProps={{ textField: { size: 'small', fullWidth: true } }}
        />

        {/* Selector de estado */}
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="estado-label">Estado</InputLabel>
          <Select
            labelId="estado-label"
            value={estadoSeleccionado}
            label="Estado"
            onChange={(e) => setEstadoSeleccionado(e.target.value)}
          >
            {ESTADOS_VALIDOS.map((estado) => (
              <MenuItem key={estado} value={estado}>
                {estado.charAt(0).toUpperCase() + estado.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Mostrar errores si ocurren */}
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {/* Mostrar el indicador de carga mientras se obtiene la información */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {licitaciones.length > 0 ? (
            licitaciones.map((licitacion) => (
              <Grid item xs={12} sm={6} md={4} key={licitacion.CodigoExterno}>
                {/* Tarjeta de licitación */}
                <Card sx={{ borderRadius: 2, boxShadow: 3, p: 2, '&:hover': { boxShadow: 6 } }}>
                  <CardContent>
                    <Typography variant="h6">{licitacion.Nombre}</Typography>
                    <Chip label={licitacion.Estado} color="primary" sx={{ mt: 1 }} />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Código: {licitacion.CodigoExterno}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Fecha de Cierre: {licitacion.FechaCierre}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      component={Link}
                      to={`/licitacion/${licitacion.CodigoExterno}`}
                    >
                      Ver Detalle
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No se encontraron licitaciones.</Typography>
          )}
        </Grid>
      )}

      {/* Mostrar tarjetas simuladas cuando la API está simulada */}
      {apiSimulada && (
        <Grid container spacing={2} sx={{ mt: 3 }}>
          {tarjetasSimuladas.map((licitacion) => (
            <Grid item xs={12} sm={6} md={4} key={licitacion.CodigoExterno}>
              <Card sx={{ borderRadius: 2, boxShadow: 3, p: 2, '&:hover': { boxShadow: 6 } }}>
                <CardContent>
                  <Typography variant="h6">{licitacion.Nombre}</Typography>
                  <Chip label={licitacion.Estado} color="warning" sx={{ mt: 1 }} />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Código: {licitacion.CodigoExterno}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Fecha de Cierre: {licitacion.FechaCierre}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="outlined" fullWidth>
                    Ver Detalle (Simulada)
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default ListadoLicitaciones;
