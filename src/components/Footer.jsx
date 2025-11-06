// src/Components/Footer.jsx
import { Box, Typography, Link as MuiLink, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

function Footer() {
  // Menú de navegación en el pie de página
  const footerMenuItems = [
    { text: 'Inicio', path: '/' },
    { text: 'Licitaciones', path: '/licitaciones' },
    { text: 'Proveedores', path: '/proveedores' },
    { text: 'Nosotros', path: '/nosotros' },
    { text: 'Contacto', path: '/contacto' },
    { text: 'Login', path: '/login' },
  ];

  // URL para el mapa de Google, usado en el footer
  const mapsURL =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.585573752697!2d-70.62737662490076!3d-33.43574939798547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5b364817459%3A0x6b8a8b1f5c6b5b1f!2sAv.%20Providencia%201760%2C%20Providencia%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1700000000000!5m2!1ses-419!2scl';

  return (
    <Box component="footer" sx={{ bgcolor: '#2D2D2D', color: '#FFFFFF', py: 8, borderTop: '1px solid #4A5568' }}>
      <Grid container spacing={4} sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
        
        {/* Sección de logo y redes sociales */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontFamily: 'Pacifico, cursive', // Tipografía con estilo manuscrito para el logo
              color: '#FFFFFF', // Color blanco para el logo
              textDecoration: 'none',
              fontSize: '1.8rem',
              '&:hover': { color: '#328CC1' }, // Hover para interactividad
            }}
          >
            LicitaSeguro
          </Typography>
          <Typography variant="body2" sx={{ color: '#D3D3D3', my: 2 }}>
            Simplificamos el acceso a licitaciones públicas en Chile para potenciar tus oportunidades de negocio.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <MuiLink href="#" aria-label="Facebook"><FacebookIcon sx={{ color: '#FFFFFF' }} /></MuiLink>
            <MuiLink href="#" aria-label="Twitter"><TwitterIcon sx={{ color: '#FFFFFF' }} /></MuiLink>
            <MuiLink href="#" aria-label="LinkedIn"><LinkedInIcon sx={{ color: '#FFFFFF' }} /></MuiLink>
            <MuiLink href="#" aria-label="Instagram"><InstagramIcon sx={{ color: '#FFFFFF' }} /></MuiLink>
          </Box>
        </Grid>

        {/* Enlaces rápidos */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }} color="primary">
            Enlaces Rápidos
          </Typography>
          {footerMenuItems.map(({ text, path }) => (
            <MuiLink
              key={text}
              component={Link}
              to={path}
              sx={{
                color: '#D3D3D3', // Color para los enlaces
                display: 'block',
                mb: 1,
                '&:hover': { color: '#328CC1', textDecoration: 'underline' }, // Hover para mejorar la interactividad
              }}
            >
              {text}
            </MuiLink>
          ))}
        </Grid>

        {/* Sección de recursos */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }} color="primary">
            Recursos
          </Typography>
          {['Guía de Licitaciones', 'Normativa Legal', 'Tutoriales', 'Webinars', 'Estadísticas'].map((text) => (
            <MuiLink
              key={text}
              to="/"
              component={Link}
              sx={{
                color: '#D3D3D3', // Color para los enlaces
                display: 'block',
                mb: 1,
                '&:hover': { color: '#328CC1', textDecoration: 'underline' }, // Hover para mejorar la interactividad
              }}
            >
              {text}
            </MuiLink>
          ))}
        </Grid>

        {/* Sección de mapa y contacto */}
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ height: 150, borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
            <iframe
              title="Ubicación en Google Maps"
              src={mapsURL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mt: 2 }} color="primary">
            Contacto
          </Typography>
          <MuiLink
            href={mapsURL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#D3D3D3', mb: 1.5 }}
          >
            <LocationOnIcon fontSize="small" sx={{ color: '#F44336' }} /> Av. Providencia 1760, Santiago
          </MuiLink>
          <MuiLink
            href="mailto:contacto@licitaseguro.cl"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#D3D3D3', mb: 1.5 }}
          >
            <EmailIcon fontSize="small" sx={{ color: '#2196F3' }} /> contacto@licitaseguro.cl
          </MuiLink>
          <MuiLink
            href="tel:+56223456789"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#D3D3D3' }}
          >
            <PhoneIcon fontSize="small" sx={{ color: '#4CAF50' }} /> +56 2 2345 6789
          </MuiLink>
        </Grid>
      </Grid>

      {/* Pie de página inferior */}
      <Box sx={{ borderTop: '1px solid #4A5568', mt: 4, pt: 4, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: '#D3D3D3' }}>
          © {new Date().getFullYear()} LicitaSeguro. Todos los derechos reservados. |{' '}
          <MuiLink to="/" component={Link} sx={{ color: '#D3D3D3', '&:hover': { color: '#FFFFFF' } }}>
            Términos
          </MuiLink>{' '}
          |{' '}
          <MuiLink to="/" component={Link} sx={{ color: '#D3D3D3', '&:hover': { color: '#FFFFFF' } }}>
            Privacidad
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
