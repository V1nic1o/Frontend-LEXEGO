// src/api/api.js

// 1. Leemos la URL de la API desde la variable de entorno.
const API_URL = process.env.REACT_APP_API_URL;

/**
 * Envía el código fuente al backend para ser analizado.
 * @param {string} codigoFuente El código a analizar.
 * @returns {Promise<Array>} Una promesa que resuelve a un arreglo de tokens.
 */
export const analizarCodigo = async (codigoFuente) => {
  try {
    const respuesta = await fetch(`${API_URL}/analizar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // 2. AJUSTE CRÍTICO: El backend en Go espera un JSON con la clave "codigo".
      //    Cambiamos { codigoFuente } por { codigo: codigoFuente }.
      body: JSON.stringify({ codigo: codigoFuente }),
    });

    if (!respuesta.ok) {
      throw new Error(`Error del servidor: ${respuesta.status}`);
    }

    const tokens = await respuesta.json();
    return tokens;

  } catch (error) {
    console.error("Error al conectar con la API:", error);
    throw error;
  }
};