// src/components/ResultsPanel.js

import React, { useState, useMemo } from 'react';
import { VscTable, VscError, VscCheck } from 'react-icons/vsc';
import EmptyStateAnimation from '../EmptyStateAnimation/EmptyStateAnimation'; // <-- 1. IMPORTAMOS LA ANIMACIÓN

export default function ResultsPanel({ tokens, error }) {
  const [activeTab, setActiveTab] = useState('tokens');

  const lexicalErrors = useMemo(() => 
    tokens.filter(token => token.Type === 'DESCONOCIDO'), 
    [tokens]
  );

  const TabButton = ({ id, label, icon, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 text-sm font-medium flex items-center gap-2 rounded-t-lg transition-colors relative ${
        activeTab === id
          ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      {icon}
      {label}
      {count > 0 && (
        <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col h-full">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <TabButton id="tokens" label="Tokens" icon={<VscTable />} />
        <TabButton id="errors" label="Errores" icon={<VscError />} count={lexicalErrors.length} />
      </div>
      <div className="flex-grow overflow-auto mt-4 font-mono text-xs">
        {activeTab === 'tokens' && (
          <>
            {error && <p className="text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20 p-3 rounded-lg m-2">{error}</p>}
            {tokens.length > 0 ? (
              <table className="w-full text-left">
                {/* ... (código de la tabla sin cambios) ... */}
                <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700">
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="p-3 text-xs font-semibold tracking-wider text-left text-gray-600 dark:text-gray-300 uppercase">Lexema</th>
                    <th className="p-3 text-xs font-semibold tracking-wider text-left text-gray-600 dark:text-gray-300 uppercase">Tipo de Token</th>
                    <th className="p-3 text-xs font-semibold tracking-wider text-left text-gray-600 dark:text-gray-300 uppercase">Línea:Col</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {tokens.map((token, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-3 font-semibold text-indigo-600 dark:text-indigo-400">{`'${token.Lexema}'`}</td>
                      <td className="p-3">{token.Type}</td>
                      <td className="p-3 text-gray-500 dark:text-gray-400">{`${token.Linea}:${token.Columna}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              // --- SECCIÓN MEJORADA CON ANIMACIÓN ---
              !error && (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 dark:text-gray-500 p-4">
                  {/* 2. REEMPLAZAMOS EL ICONO ESTÁTICO POR LA ANIMACIÓN */}
                  <EmptyStateAnimation />
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 -mt-8">Resultados del Análisis</h3>
                  <p className="mt-2 text-base">Presiona 'Analizar Código' para ver los tokens aquí.</p>
                </div>
              )
            )}
          </>
        )}
        
        {activeTab === 'errors' && (
          <div className="p-2">
            {/* ... (código de la tabla de errores sin cambios) ... */}
            {lexicalErrors.length > 0 ? (
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700">
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="p-3 text-xs font-semibold tracking-wider text-left text-gray-600 dark:text-gray-300 uppercase">Símbolo</th>
                    <th className="p-3 text-xs font-semibold tracking-wider text-left text-gray-600 dark:text-gray-300 uppercase">Línea:Col</th>
                    <th className="p-3 text-xs font-semibold tracking-wider text-left text-gray-600 dark:text-gray-300 uppercase">Descripción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {lexicalErrors.map((token, index) => (
                    <tr key={index} className="hover:bg-red-50 dark:hover:bg-red-900/20">
                      <td className="p-3 font-semibold text-red-500">{`'${token.Lexema}'`}</td>
                      <td className="p-3 text-gray-500 dark:text-gray-400">{`${token.Linea}:${token.Columna}`}</td>
                      <td className="p-3 text-gray-600 dark:text-gray-300">Símbolo no reconocido en el lenguaje.</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400 pt-10">
                <VscCheck size="3em" className="text-green-500 mb-2" />
                <h3 className="font-semibold">¡Excelente!</h3>
                <p>No se encontraron errores léxicos.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}