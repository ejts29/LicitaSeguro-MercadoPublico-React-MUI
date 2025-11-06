// src/Components/LicitacionCard.jsx
import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import EventIcon from '@mui/icons-material/Event';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

// Mapeo de colores para los estados de las licitaciones
const estadoColor = {
    publicada: 'success', // Color verde para el estado "publicada"
    cerrada: 'default', // Color gris para el estado "cerrada"
    adjudicada: 'info', // Color azul para el estado "adjudicada"
    revocada: 'warning', // Color naranja para el estado "revocada"
    desierta: 'error', // Color rojo para el estado "desierta"
    suspendida: 'warning' // Color naranja para el estado "suspendida"
};

// Formatea monto en pesos chilenos
const formatMonto = (valor) => {
    if (!valor || isNaN(valor)) return 'No disponible'; // Si el valor no es válido, devuelve "No disponible"
    return `$ ${Number(valor).toLocaleString('es-CL')} CLP`; // Formato monetario en CLP
};

// Formatea la fecha para mostrarla en formato legible
const formatFecha = (fecha) => {
    if (!fecha) return 'No disponible'; // Si no hay fecha, devuelve "No disponible"
    const d = new Date(fecha);
    return isNaN(d.getTime()) ? 'Fecha no válida' : d.toLocaleDateString('es-CL'); // Si la fecha es inválida, devuelve "Fecha no válida"
};

export default function LicitacionCard({ licitacion }) {
    return (
        <Card
            sx={{
                boxShadow: 1,
                '&:hover': { boxShadow: 3 }, // Efecto hover que aumenta la sombra
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 2,
                bgcolor: '#FFFFFF', // Fondo blanco para buen contraste con el texto
                color: '#0B3C5D', // Texto oscuro para mejor legibilidad
            }}
            role="article"  // Añadido para accesibilidad
            aria-labelledby={`titulo-${licitacion?.CodigoExterno}`} // Asocia el encabezado con el artículo para accesibilidad
            aria-label={`Licitación: ${licitacion?.Nombre || 'Sin título'}`} // Añadido para accesibilidad
        >
            <CardContent>
                {/* Muestra el código de la licitación y su estado */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                        {licitacion.CodigoExterno ?? 'Código no disponible'}
                    </Typography>
                    <Chip
                        label={licitacion.Estado ?? 'Publicada'}
                        color={estadoColor[licitacion.Estado?.toLowerCase()] || 'default'} // Muestra el estado con el color adecuado
                        size="small"
                        sx={{ textTransform: 'capitalize', bgcolor: '#E2E8F0', color: '#1A202C' }} // Mejor contraste de chip
                        aria-label={`Estado: ${licitacion.Estado || 'Publicada'}`} // Añadido para accesibilidad
                    />
                </Box>

                {/* Título de la licitación */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        minHeight: 48,
                        display: '-webkit-box',
                        WebkitLineClamp: 2, // Limita el número de líneas en el título
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                    id={`titulo-${licitacion?.CodigoExterno}`}  // ID para accesibilidad
                >
                    {licitacion.Nombre ?? 'Sin título'}  {/* Si no hay nombre, muestra "Sin título" */}
                </Typography>

                {/* Detalles del comprador */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <BusinessIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        {licitacion.Comprador?.NombreOrganismo ?? 'Organismo no disponible'}  {/* Si no hay nombre de organismo, muestra un mensaje predeterminado */}
                    </Typography>
                </Box>

                {/* Fecha de cierre de la licitación */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EventIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        Cierre: {formatFecha(licitacion.FechaCierre)}  {/* Formatea la fecha de cierre */}
                    </Typography>
                </Box>

                {/* Monto estimado de la licitación */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <MonetizationOnIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        {formatMonto(licitacion.MontoEstimado)}  {/* Formatea el monto estimado */}
                    </Typography>
                </Box>

                {/* Botón para ver el detalle de la licitación */}
                <Button
                    component={Link}
                    to={`/licitacion/${licitacion.CodigoExterno}`}
                    variant="outlined"
                    fullWidth
                    aria-label={`Ver detalle de la licitación ${licitacion.CodigoExterno}`}  // Añadido para accesibilidad
                    sx={{
                        borderColor: '#0B3C5D',
                        color: '#0B3C5D',
                        '&:hover': { bgcolor: '#0B3C5D', color: '#fff' }, // Hover visible para la interacción
                        mt: 2,
                    }}
                >
                    Ver Detalle
                </Button>
            </CardContent>
        </Card>
    );
}
