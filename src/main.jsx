// src/main.jsx
import { StrictMode } from 'react'; // Importa StrictMode de React para detectar posibles problemas en el código durante el desarrollo
import { createRoot } from 'react-dom/client'; // Se utiliza para crear el root de la aplicación React
import './index.css'; // Importa los estilos globales (CSS) para la aplicación
import App from './App.jsx'; // Importa el componente principal de la aplicación

// Importa componentes de Material UI para la funcionalidad de manejo de fechas
import { LocalizationProvider } from '@mui/x-date-pickers'; // Proporciona la localización (idioma) para los componentes de fecha
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Proveedor de adaptador para usar Day.js con los componentes de fecha de Material UI

// Crea el root de la aplicación y renderiza la aplicación dentro del DOM en el elemento con id 'root'
// StrictMode es una herramienta de desarrollo que activa advertencias para identificar patrones potencialmente problemáticos
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* El LocalizationProvider es un contenedor que permite usar los componentes de fecha (como DatePicker) en la localización correcta (aquí se usa Dayjs para las fechas) */}
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* El componente principal de la aplicación */}
      <App />
    </LocalizationProvider>
  </StrictMode>
);
