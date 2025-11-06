// src/Pages/Login.jsx
import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Alert, CircularProgress, Paper, Link as MuiLink, Divider } from '@mui/material';
import { styled } from '@mui/system';
import GoogleIcon from '@mui/icons-material/Google'; // Importar icono de Google

const Login = () => {
  // Estilos para el título y el formulario, definidos dentro del componente
  const LoginTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 800,
    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', // Ajustado tamaño más pequeño
    marginBottom: theme.spacing(3), // Reducido el margen
    color: theme.palette?.primary?.dark || '#333',
    textAlign: 'center',
  }));

  const StyledLoginForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2), // Reducido el espacio entre los campos
    maxWidth: 350, // Tamaño reducido del formulario
    margin: '0 auto', // Centrado
    padding: theme.spacing(3), // Reducido el padding dentro del formulario
    borderRadius: theme.shape?.borderRadius * 2, // Bordes redondeados
    boxShadow: theme.shadows?.[5],
    backgroundColor: theme.palette?.background?.paper,
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)', // Efecto de hover para darle un toque de interactividad
    },
  }));

  // Definición de estados para controlar los valores del formulario y los estados de carga/error/success
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Función para manejar el login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    await new Promise(resolve => setTimeout(resolve, 1500)); // Simula un retardo para la carga

    if (username === 'usuario' && password === 'contrasena123') {
      setSuccess(true);
      setError(null);
      setUsername(''); // Limpia el campo de usuario
      setPassword(''); // Limpia el campo de contraseña
    } else {
      setError('Credenciales inválidas. Inténtalo de nuevo.');
      setSuccess(false);
    }
    setLoading(false); // Finaliza la carga
  };

  // Función para manejar el restablecimiento de la contraseña
  const handleForgotPassword = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    await new Promise(resolve => setTimeout(resolve, 1000)); // Simula un retardo

    setSuccess(true);
    setError('Se ha enviado un enlace de restablecimiento de contraseña a tu correo (simulado).');
    setLoading(false); // Finaliza la carga
  };

  // Función para manejar el login con Google (simulado)
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    await new Promise(resolve => setTimeout(resolve, 1500)); // Simula un retardo

    const googleLoginSuccess = Math.random() > 0.3; // 70% de éxito

    if (googleLoginSuccess) {
      setSuccess(true);
      setError(null);
    } else {
      setError('No se pudo iniciar sesión con Google. Inténtalo de nuevo.');
      setSuccess(false);
    }
    setLoading(false); // Finaliza la carga
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 }, // Padding vertical responsivo
        bgcolor: 'background.default',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: { xs: 3, md: 4 }, // Espacio entre el título y el formulario
      }}
    >
      <Container maxWidth="sm">
        <LoginTitle>Iniciar Sesión</LoginTitle>

        <Typography variant="body1" align="center" sx={{ mb: 3, fontSize: '1rem', color: 'text.secondary' }}>
          Ingresa tus credenciales para acceder a la plataforma.
        </Typography>

        <StyledLoginForm onSubmit={handleLogin}>
          {/* Mostrar mensajes de error y éxito */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              ¡Inicio de sesión exitoso!
            </Alert>
          )}

          {/* Campo para el nombre de usuario */}
          <TextField
            label="Nombre de Usuario"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            required
            sx={{ mb: 2 }}
            aria-label="Nombre de Usuario" // Mejora de accesibilidad
          />

          {/* Campo para la contraseña */}
          <TextField
            label="Contraseña"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            sx={{ mb: 2 }}
            aria-label="Contraseña" // Mejora de accesibilidad
          />

          {/* Enlace para restablecer la contraseña */}
          <MuiLink
            component="button"
            variant="body2"
            onClick={handleForgotPassword}
            disabled={loading}
            sx={{
              alignSelf: 'flex-end',
              color: 'primary.main',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            ¿Olvidó su contraseña?
          </MuiLink>

          {/* Botón para enviar el formulario de login */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              mt: 2,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: theme => theme.shape.borderRadius * 1.5,
              boxShadow: theme => theme.shadows[4],
              '&:hover': {
                boxShadow: theme => theme.shadows[6],
                transform: 'translateY(-2px)',
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Acceder'}
          </Button>

          {/* Separador de opciones */}
          <Divider sx={{ my: 3 }}><Typography variant="body2" color="text.secondary">o</Typography></Divider>

          {/* Botón de inicio de sesión con Google */}
          <Button
            variant="outlined"
            color="inherit"
            fullWidth
            disabled={loading}
            onClick={handleGoogleLogin}
            startIcon={<GoogleIcon />}
            sx={{
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: theme => theme.shape.borderRadius * 1.5,
              borderColor: 'text.secondary',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'primary.main',
                color: 'primary.main',
                boxShadow: theme => theme.shadows[2],
                transform: 'translateY(-2px)',
              },
            }}
          >
            Iniciar sesión con Google
          </Button>
        </StyledLoginForm>
      </Container>
    </Box>
  );
};

export default Login;
