// src/Services/dashboardService.js
// Servicio que intenta conectarse al backend para obtener contadores.
// Si falla la conexión, retorna datos simulados.

import axios from "axios";

export async function obtenerResumenLicitaciones() {
  try {
    const response = await axios.get("http://localhost:3001/api/contador");

    //  Desestructuramos con valores por defecto
    const {
      licitaciones = 0,
      proveedores = 0,
      usuarios = 0
    } = response?.data || {};

    return {
      licitaciones,
      proveedores,
      usuarios,
      simulado: false, // Datos reales
    };
  } catch (error) {
    console.error(" Error al obtener resumen de licitaciones:", error.message);   
    console.warn("Usando datos simulados: No se pudo conectar al backend.");

    // Datos simulados como fallback
    return {
      licitaciones: 100,
      proveedores: 200,
      usuarios: 50,
      simulado: true, // Datos simulados
    };
  }
}
