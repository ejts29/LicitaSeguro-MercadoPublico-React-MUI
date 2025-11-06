// src/Components/Navbar.jsx
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Menú de navegación con rutas definidas
  const menuItems = [
    { text: 'Inicio', path: '/' },
    { text: 'Licitaciones', path: '/licitaciones' },
    { text: 'Proveedores', path: '/proveedores' },
    { text: 'Nosotros', path: '/nosotros' },
    { text: 'Contacto', path: '/contacto' },
    { text: 'Login', path: '/login' },
  ];

  // Contenido del drawer (menú móvil)
  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle} role="presentation">
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            sx={{ py: 1.5 }}
            role="link" // Añadido para accesibilidad
            aria-label={item.text}  // Mejora la accesibilidad para lectores de pantalla
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#fff', color: '#0B3C5D', boxShadow: 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo de la aplicación */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            fontFamily: 'Pacifico, cursive',
            color: '#0B3C5D',
            textDecoration: 'none',
            '&:hover': { color: '#328CC1' },  // Hover para interacción con el logo
          }}
          aria-label="Ir a inicio"  // Añadido para accesibilidad
        >
          LicitaSeguro
        </Typography>

        {/* Menú para pantallas grandes */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          {menuItems.map((item) => (
            <Typography
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                color: '#0B3C5D',
                fontWeight: 500,
                textDecoration: 'none',
                '&:hover': { color: '#328CC1', cursor: 'pointer' },  // Hover visible para la interacción
              }}
              aria-label={item.text} // Añadido un aria-label para mejorar la accesibilidad
            >
              {item.text}
            </Typography>
          ))}
        </Box>

        {/* Botón para abrir el menú móvil */}
        <IconButton
          color="inherit"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{ display: { md: 'none' } }} // Mostrar solo en móviles
          aria-label="Abrir menú de navegación"  // Añadido para accesibilidad
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Drawer (menú móvil) */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { md: 'none' } }} // Solo visible en dispositivos móviles
        aria-labelledby="drawer-menu"  // Añadido para accesibilidad
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
