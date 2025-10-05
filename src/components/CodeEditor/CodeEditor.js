// src/components/CodeEditor.js
import React from 'react';
// Importamos los dos iconos que usaremos: uno para el título y otro para el botón.
import { VscRunAll, VscFileCode } from 'react-icons/vsc';

export default function CodeEditor({ codigo, setCodigo, handleAnalizar, isLoading }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col h-full">
      
      {/* --- TÍTULO MODIFICADO CON ICONO --- */}
      <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200 flex items-center gap-2">
        <VscFileCode className="text-blue-500" />
        Código Fuente
      </h2>
      
      <textarea
        className="flex-grow w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition resize-none"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        placeholder="Escribe tu código aquí..."
      />
      <button
        onClick={handleAnalizar}
        disabled={isLoading}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 disabled:from-gray-400 disabled:to-gray-500 transition-all transform hover:scale-[1.02]"
      >
        <VscRunAll size="1.2em" />
        {isLoading ? 'Analizando...' : 'Analizar Código'}
      </button>
    </div>
  );
}