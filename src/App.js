// src/App.js
import React, { useState } from 'react';
import { analizarCodigo } from './api/api';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import CodeEditor from './components/CodeEditor/CodeEditor';
import ResultsPanel from './components/ResultsPanel/ResultsPanel';
import { BsShare } from 'react-icons/bs';
import Loader from './components/loader/Loader'; 

function App() {
  const [codigo, setCodigo] = useState('variable := 100 -- comentario\nresultado >= 200');
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalizar = async () => {
    setIsLoading(true); 
    setError('');
    setTokens([]);
    try {
      const [resultadoTokens] = await Promise.all([
        analizarCodigo(codigo),
        new Promise(resolve => setTimeout(resolve, 1500)) 
      ]);
      setTokens(resultadoTokens);
    } catch (err) {
      setError('Error al analizar el código. Asegúrate de que el servidor de Go esté corriendo.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-gray-200">
      
      {isLoading && <Loader />}

      <header className="container mx-auto sticky top-4 z-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-xl rounded-2xl">
        <div className="px-8 py-6 flex justify-between items-center">
          
          {/* --- SECCIÓN CON ANIMACIONES --- */}
          <div className="flex items-center gap-5 group"> {/* Se añade 'group' para animaciones coordinadas si se quisiera */}
            
            {/* 1. Animación para el icono y el título */}
            <div className="transition-transform duration-300 ease-in-out hover:scale-110">
              <div className="flex items-center gap-5">
                <BsShare className="text-blue-500" size="2em" />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                  <span className="text-blue-600">Analizador</span> Léxico
                </h1>
              </div>
            </div>

          </div>

          {/* 2. Animación para el botón de tema */}
          <div className="transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-12">
            <ThemeToggle />
          </div>

        </div>
      </header>

      <main className="container mx-auto p-4 pt-8" style={{ height: 'calc(100vh - 120px)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            <CodeEditor 
              codigo={codigo} 
              setCodigo={setCodigo} 
              handleAnalizar={handleAnalizar} 
              isLoading={isLoading} 
            />
            <ResultsPanel tokens={tokens} error={error} />
          </div>
      </main>
    </div>
  );
}

export default App;