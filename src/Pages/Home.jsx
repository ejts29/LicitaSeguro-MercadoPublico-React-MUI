// src/Pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Container, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link } from 'react-router-dom';
import { obtenerResumenLicitaciones } from "../Services/dashboardService";
import portada from '../assets/images/portada.jpg';

function Home() {
  const [licitacionesCount, setLicitacionesCount] = useState(0);
  const [proveedoresCount, setProveedoresCount] = useState(0);
  const [usuariosCount, setUsuariosCount] = useState(0);
  const [estadoDatos, setEstadoDatos] = useState(null);

  useEffect(() => {
    obtenerResumenLicitaciones()
      .then(({ licitaciones, proveedores, usuarios, simulado }) => {
        setLicitacionesCount(licitaciones);
        setProveedoresCount(proveedores);
        setUsuariosCount(usuarios);
        setEstadoDatos(simulado ? 'simulado' : 'real');
      })
      .catch(() => {
        setEstadoDatos('error');
      });
  }, []);

  return (
    <Box>
      {/* Estado de Datos: Real, Simulado o Error */}
      {estadoDatos === 'real' && (
        <Alert severity="success" sx={{ borderRadius: 0 }}>
          ✅ Datos reales obtenidos desde la API de Mercado Público.
        </Alert>
      )}
      {estadoDatos === 'simulado' && (
        <Alert severity="warning" sx={{ borderRadius: 0 }}>
          ⚠️ Mostrando datos simulados debido a problemas de conexión o falta de datos reales.
        </Alert>
      )}
      {estadoDatos === 'error' && (
        <Alert severity="error" sx={{ borderRadius: 0 }}>
          ❌ Error al obtener los datos desde la API.
        </Alert>
      )}

      {/* Fondo con Imagen */}
      <Box sx={{
        backgroundImage: `url(${portada})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
      }}>
        <Container maxWidth="md">
          <Box sx={{ bgcolor: 'rgba(0,0,0,0.6)', p: 4, borderRadius: 3 }}>
            <Typography variant="h3" gutterBottom>
              Simplificamos el acceso a licitaciones públicas en Chile
            </Typography>
            <Typography variant="h6" gutterBottom>
              Accede a información actualizada sobre licitaciones y optimiza tus oportunidades de negocio.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/licitaciones"
                sx={{ mr: 2 }}
              >
                Explorar Licitaciones
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                component={Link}
                to="/proveedores"
              >
                Buscar Proveedor
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Beneficios de LicitaSeguro */}
      <Container sx={{ my: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          ¿Por qué elegir LicitaSeguro?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {[{
            icon: <SearchIcon fontSize="large" />, title: 'Búsqueda Simplificada', desc: 'Encuentra licitaciones públicas fácilmente con filtros claros e intuitivos.',
          }, {
            icon: <AccessTimeIcon fontSize="large" />, title: 'Información en Tiempo Real', desc: 'Datos siempre actualizados con nuevas licitaciones, fechas y estado.',
          }, {
            icon: <DescriptionIcon fontSize="large" />, title: 'Detalles Completos', desc: 'Conoce todos los requisitos, montos y adjudicaciones en formato claro.',
          }].map((item, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Box sx={{ p: 3, textAlign: 'center', bgcolor: '#F7FAFC', borderRadius: 2, boxShadow: 2 }}>
                <Box sx={{ mb: 2, color: 'primary.main' }}>{item.icon}</Box>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2">{item.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Estadísticas Generales */}
      <Box sx={{ py: 10, bgcolor: '#F7FAFC' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ textAlign: 'center' }}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#0B3C5D', mb: 1 }}>
                {licitacionesCount}
              </Typography>
              <Typography variant="body1">Licitaciones Disponibles</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#0B3C5D', mb: 1 }}>
                {proveedoresCount}
              </Typography>
              <Typography variant="body1">Proveedores Registrados</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#0B3C5D', mb: 1 }}>
                {usuariosCount}
              </Typography>
              <Typography variant="body1">Usuarios Activos</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Llamada a la Acción */}
      <Box sx={{ py: 10, bgcolor: '#0B3C5D' }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff', mb: 3 }}>
            ¿Listo para optimizar tus oportunidades de negocio?
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 4, maxWidth: '600px', mx: 'auto' }}>
            Regístrate hoy y accede a todas las herramientas que LicitaSeguro tiene para ti.
          </Typography>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            sx={{ bgcolor: '#fff', color: '#0B3C5D', fontWeight: 600, py: 1.5, px: 4, borderRadius: '8px', boxShadow: 3 }}
          >
            Crear Cuenta Gratis
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            sx={{ ml: 2, color: '#fff', borderColor: '#fff', fontWeight: 400, py: 1.3, px: 5, borderRadius: '8px' }}
          >
            Iniciar Sesión
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
