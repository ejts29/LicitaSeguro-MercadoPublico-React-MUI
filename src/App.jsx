// Importación de dependencias necesarias
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importamos Router y las rutas
import { LocalizationProvider } from "@mui/x-date-pickers"; // Importamos el proveedor de localización para los pickers
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Usamos el adaptador Dayjs para el componente de fecha
import Home from "./Pages/Home"; // Importamos la página de inicio
import ListadoLicitaciones from "./Pages/ListadoLicitaciones"; // Importamos la página de listado de licitaciones
import DetalleLicitacion from "./Pages/DetalleLicitacion"; // Importamos la página de detalle de licitación
import Proveedores from "./Pages/Proveedores"; // Importamos la página de proveedores
import Nosotros from "./Pages/Nosotros"; // Importamos la página "Nosotros"
import Navbar from "./components/Navbar"; // Importamos el componente de la barra de navegación
import Footer from "./components/Footer"; // Importamos el pie de página
import Contacto from "./Pages/Contacto"; // Importamos la página de contacto
import Login from "./Pages/Login"; // Importamos la página de login

// Componente para scroll al cambiar de ruta
function ScrollToTop() {
  React.useEffect(() => {
    window.scrollTo(0, 0); // Hace scroll al inicio de la página cada vez que se cambia de ruta
  }, []); // Efecto de solo ejecución una vez cuando se monta el componente
  return null; // No retorna nada, solo ejecuta la acción de hacer scroll
}

// Componente principal de la aplicación
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}> {/* Proveedor para adaptar las fechas con Dayjs */}
      <Router> {/* Componente Router que maneja las rutas de la aplicación */}
        <ScrollToTop /> {/* Componente para realizar scroll al cambiar de ruta */}
        <Navbar /> {/* Barra de navegación en todas las páginas */}
        
        <Routes> {/* Contenedor de rutas */}
          {/* Definición de las rutas y sus componentes correspondientes */}
          <Route path="/" element={<Home />} /> {/* Ruta principal: Página de inicio */}
          <Route path="/licitaciones" element={<ListadoLicitaciones />} /> {/* Ruta para el listado de licitaciones */}
          <Route path="/licitacion/:codigo" element={<DetalleLicitacion />} /> {/* Ruta para detalle de una licitación */}
          <Route path="/proveedores" element={<Proveedores />} /> {/* Ruta para la página de proveedores */}
          <Route path="/nosotros" element={<Nosotros />} /> {/* Ruta para la página de "Nosotros" */}
          <Route path="/contacto" element={<Contacto />} /> {/* Ruta para la página de contacto */}
          <Route path="/login" element={<Login />} /> {/* Ruta para la página de login */}
        </Routes>
        
        <Footer /> {/* Pie de página en todas las páginas */}
      </Router>
    </LocalizationProvider>
  );
}

export default App; // Exportamos el componente principal de la aplicación
