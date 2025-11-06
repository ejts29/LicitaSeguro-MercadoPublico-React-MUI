// src/Pages/Nosotros.jsx
import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Divider,
    Paper,
    Avatar
} from '@mui/material';
import { styled } from '@mui/system';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Nosotros() {
    // --- Estilos de Componentes ---
    const SectionTitle = styled(Typography)(({ theme }) => ({
        fontWeight: 800,
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', // Reducido el tamaño de la fuente
        marginBottom: theme.spacing(4), // Reducido el margen
        color: theme.palette?.primary?.dark || '#333',
        textAlign: 'center',
    }));

    const SubSectionTitle = styled(Typography)(({ theme }) => ({
        fontWeight: 700,
        fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', // Ajustado para ser más pequeño
        marginBottom: theme.spacing(3), // Reducido el margen
        color: theme.palette?.secondary?.dark || '#555',
        textAlign: 'center',
    }));

    // StyledPaper para las tarjetas con tamaño uniforme y efectos
    const StyledPaper = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(3), // Reducido el padding
        borderRadius: theme.shape?.borderRadius * 2,
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        boxShadow: theme.shadows?.[6],
        transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease-in-out',
        '&:hover': {
            transform: 'translateY(-5px) scale(1.02)', // Reducido el efecto hover
            boxShadow: theme.shadows?.[8],
        },
    }));

    // Datos de Misión, Visión, Valores
    const missionVisionValuesData = [
        {
            icon: <AssignmentIcon fontSize="large" color="primary" />,
            title: 'Misión',
            description: 'En LicitaSeguro, nuestra misión es simplificar y hacer más accesible el proceso de participación en licitaciones públicas. Proveemos a las empresas una plataforma confiable para acceder a oportunidades comerciales y licitaciones en tiempo real.',
        },
        {
            icon: <SchoolIcon fontSize="large" color="primary" />,
            title: 'Visión',
            description: 'Ser la plataforma líder de consulta y gestión de licitaciones en Chile, destacando por nuestra transparencia, rapidez y confiabilidad, ayudando a las empresas a aprovechar las oportunidades que el mercado público ofrece.',
        },
        {
            icon: <CheckCircleIcon fontSize="large" color="primary" />,
            title: 'Valores',
            description: 'Innovación, transparencia, compromiso con la excelencia y la satisfacción de nuestros usuarios. Estamos comprometidos en ofrecer el mejor servicio para mejorar la competitividad de nuestros clientes.',
        },
    ];

    // Datos del equipo
    const teamMembers = [
        {
            name: 'Efren Tovar',
            title: 'CEO & Fundador',
            description: 'Juan es el fundador de LicitaSeguro, con más de 15 años de experiencia en el sector público y privado. Su visión es transformar la manera en que las empresas acceden a licitaciones públicas.',
            avatarContent: 'ET',
        },
        {
            name: 'Eduardo Ahumada',
            title: 'CTO & Desarrollador Principal',
            description: 'Luis es el responsable de la infraestructura tecnológica de LicitaSeguro, liderando el desarrollo de nuevas funcionalidades y la seguridad de la plataforma.',
            avatarContent: 'EA',
        },
        {
            name: 'Instituto profesional San Sebastián',
            title: 'Directora de Operaciones',
            description: 'María lidera las operaciones diarias de LicitaSeguro, asegurando que nuestros procesos sean ágiles, eficientes y estén alineados con las necesidades de nuestros clientes.',
            avatarContent: 'IPSS',
        },
    ];

    return (
        <Box sx={{
            py: { xs: 6, md: 8 }, // Ajuste para que el espacio superior sea más pequeño
            bgcolor: 'background.default',
            overflow: 'hidden',
            backgroundImage: 'radial-gradient(ellipse at center, rgba(230, 240, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%)',
        }}>
            <Container maxWidth="lg">
                {/* Sección: Sobre LicitaSeguro */}
                <SectionTitle>
                    Nosotros en LicitaSeguro
                </SectionTitle>

                <Typography
                    variant="h6"
                    align="center"
                    sx={{
                        mb: { xs: 4, md: 6 }, // Reducido el margen
                        maxWidth: 800,
                        mx: 'auto',
                        lineHeight: 1.8,
                        fontSize: '1.1rem',
                        color: 'text.secondary',
                    }}
                >
                    Nuestra misión es facilitar el acceso a las licitaciones públicas en Chile, optimizando
                    las oportunidades de negocio para empresas y proveedores.
                </Typography>

                <Divider sx={{ my: { xs: 4, md: 6 }, borderColor: 'divider' }} />

                {/* Sección: Misión, Visión, Valores */}
                <SubSectionTitle>
                    Nuestra Misión, Visión y Valores
                </SubSectionTitle>

                <Grid container spacing={4} alignItems="stretch" sx={{ mb: { xs: 6, md: 8 } }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {missionVisionValuesData.map((item, index) => (
                        <Grid key={index} sx={{ gridColumn: { xs: 'span 4', sm: 'span 4', md: 'span 4' } }}>
                            <StyledPaper>
                                {item.icon}
                                <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.dark' }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mt: 2, lineHeight: 1.7 }}>
                                    {item.description}
                                </Typography>
                            </StyledPaper>
                        </Grid>
                    ))}
                </Grid>

                <Divider sx={{ my: { xs: 4, md: 6 }, borderColor: 'divider' }} />

                {/* Sección: Conoce a Nuestro Equipo */}
                <SubSectionTitle>
                    Conoce a Nuestro Equipo
                </SubSectionTitle>

                <Grid container spacing={4} justifyContent="center" alignItems="stretch" sx={{ mb: { xs: 4, md: 6 } }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {teamMembers.map((member, index) => (
                        <Grid key={index} sx={{ gridColumn: { xs: 'span 4', sm: 'span 4', md: 'span 4' } }}>
                            <StyledPaper>
                                <Avatar sx={{
                                    width: 100, // Avatar más pequeño
                                    height: 100,
                                    margin: '0 auto',
                                    bgcolor: (theme) => {
                                        const colors = [
                                            theme.palette.primary.main,
                                            theme.palette.secondary.main,
                                            theme.palette.info.main,
                                            theme.palette.warning.main,
                                            theme.palette.success.main,
                                        ];
                                        return colors[index % colors.length];
                                    },
                                    fontSize: '2rem',
                                    fontWeight: 'bold'
                                }}>
                                    {member.avatarContent}
                                </Avatar>
                                <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'text.primary' }}>
                                    {member.name}
                                </Typography>
                                <Typography variant="body2" color="primary.main" sx={{ mb: 1 }}>
                                    {member.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 2, lineHeight: 1.6 }}>
                                    {member.description}
                                </Typography>
                            </StyledPaper>
                        </Grid>
                    ))}
                </Grid>

            </Container>
        </Box>
    );
}

export default Nosotros;
