import React, { useState, useCallback } from 'react';
import { ApiResponse } from './types';
import InputForm from './components/InputForm';
import ResponseDisplay from './components/ResponseDisplay';
import Loader from './components/Loader';
import ErrorAlert from './components/ErrorAlert';

// IMPORTANT: Replace this with the URL you got from Vercel in Part 1.
const API_ENDPOINT = 'https://bfhl-geleap5vn-devanshs-projects-0f1df5a7.vercel.app/'; 

const App: React.FC = () => {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (data: string) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    if (API_ENDPOINT.includes('YOUR_VERCEL_API_URL')) {
        setError("Please update the API_ENDPOINT in App.tsx with your deployed backend URL.");
        setIsLoading(false);
        return;
    }

    try {
      if (!data.trim()) {
        throw new Error("Input data cannot be empty.");
      }
      
      const inputArray = data.split(',').map(item => item.trim());
      
      const apiResponse = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputArray }),
      });

      const result = await apiResponse.json();

      if (!apiResponse.ok) {
        throw new Error(result.error || `Request failed with status ${apiResponse.status}`);
      }
      
      setResponse(result);

    } catch (e) {
      const err = e as Error;
      setError(err.message || "An unexpected error occurred.");
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Data Processor
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Enter comma-separated values to call the live BFHL API.
          </p>
        </header>
        
        <main className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-cyan-500/10 p-6 sm:p-8 border border-slate-700">
          <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
          
          <div className="mt-8">
            {isLoading && <Loader />}
            {error && <ErrorAlert message={error} />}
            {response && <ResponseDisplay data={response} />}
          </div>
        </main>
        
        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
};

export default App;