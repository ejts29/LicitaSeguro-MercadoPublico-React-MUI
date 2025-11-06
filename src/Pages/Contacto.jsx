// src/Pages/Contacto.jsx
import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Alert, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';

const Contacto = () => {
  // Estilo del título del formulario de contacto
  const ContactTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 800,
    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', // Ajuste dinámico de tamaño
    marginBottom: theme.spacing(3), // Reducción del margen inferior
    color: theme.palette?.primary?.dark || '#333',
    textAlign: 'center',
  }));

  // Estilo del formulario para mejor presentación
  const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2), // Espaciado entre los campos
    maxWidth: 400, // Limitar el tamaño del formulario
    margin: '0 auto', // Centrado horizontal
    padding: theme.spacing(3), // Padding interno ajustado
    borderRadius: theme.shape?.borderRadius * 2, // Bordes redondeados
    boxShadow: theme.shadows?.[3], // Sombra moderada
    backgroundColor: theme.palette?.background?.paper,
  }));

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    queryType: '',
    mensaje: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Tipos de consulta que se pueden elegir
  const queryTypes = [
    { value: 'general', label: 'Consulta General' },
    { value: 'technical_support', label: 'Soporte Técnico' },
    { value: 'suggestion', label: 'Sugerencia/Mejora' },
    { value: 'bug_report', label: 'Reporte de Error' },
    { value: 'partnership', label: 'Propuesta de Colaboración' },
    { value: 'other', label: 'Otro' },
  ];

  // Manejo de cambios en los campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validación del formulario
  const validateForm = () => {
    const { nombre, email, queryType, mensaje } = formData;
    if (!nombre || !email || !queryType || !mensaje) {  // Verifica que no haya campos vacíos
      setError('Todos los campos son obligatorios.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {  // Verifica el formato del correo electrónico
      setError('Por favor, ingrese un correo electrónico válido.');
      return false;
    }
    return true;
  };

  // Enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setError(null);
      setSuccess(true);
      setFormData({ nombre: '', email: '', queryType: '', mensaje: '' }); // Limpiar formulario después de enviar
    }
  };

  return (
    <Box sx={{
      py: { xs: 6, md: 8 }, // Ajuste de padding vertical
      bgcolor: 'background.default',
      display: 'flex',
      justifyContent: 'center', // Centrado horizontal
      alignItems: 'center', // Centrado vertical
      minHeight: '80vh', // Altura mínima para asegurar la visualización
    }}>
      <Container maxWidth="sm"> {/* Contenedor para el formulario */}
        <ContactTitle>Contacto</ContactTitle>

        <Typography variant="body1" align="center" sx={{ mb: 4, fontSize: '1rem', color: 'text.primary' }}>
          Si tienes alguna consulta o necesitas más información, no dudes en ponerte en contacto con nosotros. ¡Estaremos encantados de ayudarte!
        </Typography>

        {/* Mostrar errores y mensajes de éxito */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            ¡Tu mensaje ha sido enviado con éxito!
          </Alert>
        )}

        {/* Formulario de entrada */}
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            label="Tu nombre"
            variant="outlined"
            fullWidth
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
            sx={{ mb: 2 }}
            aria-label="Nombre del usuario"
          />
          <TextField
            label="Tu correo electrónico"
            variant="outlined"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            type="email"
            sx={{ mb: 2 }}
            aria-label="Correo electrónico del usuario"
          />

          {/* Selector de tipo de consulta */}
          <FormControl fullWidth required variant="outlined" sx={{ mb: 2 }}>
            <InputLabel id="query-type-label">Tipo de Consulta</InputLabel>
            <Select
              labelId="query-type-label"
              id="queryType"
              name="queryType"
              value={formData.queryType}
              onChange={handleInputChange}
              label="Tipo de Consulta"
              aria-label="Selecciona el tipo de consulta"
            >
              <MenuItem value="">
                <em>Selecciona un tipo</em>
              </MenuItem>
              {queryTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Tu mensaje"
            variant="outlined"
            fullWidth
            name="mensaje"
            value={formData.mensaje}
            onChange={handleInputChange}
            required
            multiline
            rows={4}
            sx={{ mb: 2 }}
            aria-label="Mensaje del usuario"
          />

          {/* Botón de envío */}
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
            Enviar mensaje
          </Button>
        </StyledForm>
      </Container>
    </Box>
  );
};

export default Contacto;
