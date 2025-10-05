// src/components/Loader.js

import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/loader-animation.json';

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-gray-100 dark:bg-gray-900 flex items-center justify-center z-50 p-4">
      
      {/* Contenedor principal que centra todo */}
      <div className="flex flex-col items-center text-center">
        
        {/* --- SECCIÓN CORREGIDA Y MEJORADA --- */}
        {/* Este es el "escenario" circular, ahora mucho más grande y con más opacidad. */}
        <div className="
          w-80 h-80       // Tamaño base para móviles (más grande que antes)
          md:w-[450px]    // Tamaño para pantallas medianas y grandes (aún más grande)
          md:h-[450px]
          flex items-center justify-center 
          rounded-full 
          transition-colors duration-300
          dark:bg-white/20  // Aumentamos la opacidad al 20% para un contraste garantizado
        ">
          {/* Contenedor interno para la animación */}
          <div className="w-full">
            <Lottie animationData={animationData} loop={true} />
          </div>
        </div>

        {/* Mensaje de carga con mejor contraste */}
        <p className="
          text-gray-800 dark:text-gray-100 
          font-semibold text-2xl         // Texto más grande
          mt-8                           
          animate-pulse"
        >
          Analizando código...
        </p>

      </div>
    </div>
  );
}