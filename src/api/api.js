// src/api/api.js

// Leemos la URL de nuestra API desde el archivo .env
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
      body: JSON.stringify({ codigoFuente }), // Enviamos el código en el formato que espera el backend
    });

    if (!respuesta.ok) {
      // Si el servidor responde con un error (ej. 400, 500), lanzamos una excepción.
      throw new Error(`Error del servidor: ${respuesta.status}`);
    }

    const tokens = await respuesta.json();
    return tokens;

  } catch (error) {
    // Si hay un error de red o de otro tipo, lo manejamos aquí.
    console.error("Error al conectar con la API:", error);
    // Propagamos el error para que el componente de la UI pueda mostrar un mensaje.
    throw error;
  }
};