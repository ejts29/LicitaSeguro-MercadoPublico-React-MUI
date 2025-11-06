```
#  LicitaSeguro - Portal de Licitaciones Públicas (React/MUI)

> Proyecto desarrollado como **Evaluación Final de Desarrollo Frontend (EXAMEN TRANSVERSAL)**. Es una **Single Page Application (SPA)** moderna cuyo propósito es facilitar la consulta y exploración de licitaciones públicas disponibles en el portal oficial **Mercado Público (ChileCompra)**.
>
> Este sistema demuestra la capacidad de construir aplicaciones empresariales escalables mediante la **integración de APIs externas**, un diseño profesional con **Material UI (MUI)** y código mantenible con **React**.

---

##  Habilidades Clave Demostradas

###  Integración de API Externa y Lógica (IL 3.2.1)
* **Consumo de API:** La aplicación utiliza **Axios** para el consumo directo de los *endpoints* de la **API de Mercado Público**.
* **Funcionalidad Principal:** La lógica implementada permite a los usuarios:
    * Consultar y navegar el listado de licitaciones.
    * **Filtrar** licitaciones por fecha y estado.
    * **Buscar** proveedores específicos por RUT.
* **Validación de Integración:** Se adjunta la colección de **Postman** (`consumo de API Mercado Publico.postman_collection.json`) como evidencia de la validación del Back-End externo.

###  Diseño y Arquitectura (MUI & Estándares)
* **Framework y Tecnología:** Construido con **React** y **Vite**, asegurando una aplicación rápida y moderna (SPA).
* **Interfaz Profesional:** Uso de **Material UI (MUI)** para todos los componentes (Tablas, Formularios, Selectores de Fecha), garantizando un diseño limpio, profesional y altamente funcional.
* **Diseño Responsivo y Accesible:** La interfaz es completamente **responsiva**, adaptándose a dispositivos móviles y de escritorio. Se aplica soporte para navegación por teclado y uso de etiquetas **ARIA** para la accesibilidad.
* **Componentes Avanzados:** Implementación de librerías como `@mui/x-date-pickers` y **React Router DOM** para la gestión de rutas internas y la experiencia de usuario.

###  Estándares y Mantenibilidad 
* **Validación en Tiempo Real:** El Front-End incluye validación de datos en los formularios (ej. formato de email, fechas) en tiempo real, mejorando la experiencia del usuario y la calidad de la data.
* **Estándares de Codificación:** Integración de **ESLint** (`eslint.config.js`) para hacer cumplir las convenciones de codificación, lo que optimiza la legibilidad y la mantenibilidad del código.

---

## Tecnologías Utilizadas

* **Frontend:** React (Vite)
* **UI/Componentes:** Material UI (MUI)
* **Consumo de API:** Axios
* **Librerías Adicionales:** React Router DOM, Day.js.
* **Calidad de Código:** ESLint.

---

## Ejecución en Línea (Front-End)

Este proyecto es Front-End puro y puede ser desplegado fácilmente en servicios gratuitos.

### Instrucciones de Despliegue (Netlify/Vercel)
1.  **Conexión:** Conecte este repositorio a un servicio de *hosting* Front-End (Netlify o Vercel).
2.  **Comando de Build:** **`npm run build`**.
3.  **Directorio de Publicación:** **`dist`** (la carpeta que genera Vite).

### Ejecución Local
1.  Clonar el repositorio: `git clone https://github.com/tuusuario/licitaseguro.git`
2.  Navegar al directorio del proyecto: `cd licitaseguro`
3.  Instalar dependencias: `npm install`
4.  Inicia el servidor de desarrollo: `npm run dev`
5.  Abre tu navegador y accede a `http://localhost:5173/` para ver la aplicación en funcionamiento.

---

##  Estructura del Proyecto

```

/src
/components            \# Componentes reutilizables
/Pages                 \# Páginas principales de la aplicación
/assets                \# Imágenes, iconos y recursos estáticos
/Services              \# Funciones para consumir la API (ej. Axios)
/styles                \# Archivos de estilos personalizados
/App.jsx                 \# Componente principal de la aplicación
/index.jsx               \# Punto de entrada de la aplicación
/package.json            \# Configuración de dependencias y scripts

```

## Documentación Adicional

### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

#### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

### Características

* Interfaz moderna: Construida con Material-UI para garantizar una experiencia de usuario limpia y profesional.
* Accesibilidad: La aplicación es accesible, con soporte para navegación por teclado y uso de etiquetas ARIA.
* Responsiva: La aplicación se adapta a diferentes tamaños de pantalla (escritorio, tablet, móvil).
* Validación de formularios: Incluye validación en tiempo real para asegurar que los datos del usuario sean correctos antes de enviarlos.
* Consumo de API: La aplicación consume la API de Mercado Público para obtener información actualizada sobre licitaciones y proveedores.


```