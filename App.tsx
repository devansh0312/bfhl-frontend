import React, { useState, useCallback } from 'react';
import { ApiResponse } from './types';
import InputForm from './components/InputForm';
import ResponseDisplay from './components/ResponseDisplay';
import Loader from './components/Loader';
import ErrorAlert from './components/ErrorAlert';

// ===================================================================================
//  FINAL STEP: You MUST replace this URL with the real URL of your backend API.
//  Find it on your Vercel dashboard under your 'bfhl-api' project.
// ===================================================================================
const API_ENDPOINT = 'https://bfhl-api-peach.vercel.app/bfhl'; 

// This will check if you are using the URL from the screenshot or another common mistake.
const isLikelyWrongUrl = API_ENDPOINT.includes('bfhl-g8mowv9im') || API_ENDPOINT.includes('frontend') || API_ENDPOINT.includes('REPLACE-THIS');

const App: React.FC = () => {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (data: string) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

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
      if (err.message.includes("Failed to fetch")) {
        setError(
          "Network Error: Could not connect to the API. The API_ENDPOINT URL in App.tsx is incorrect. Please find the correct URL for your 'bfhl-api' project on Vercel and update the file."
        );
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        
        {isLikelyWrongUrl && (
          <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/50 text-yellow-200 rounded-lg text-center">
              <strong className="font-bold block">Warning: Your API URL is incorrect!</strong>
              <p className="mt-1">The URL below is for your frontend. You must find and use the URL for your <strong>`bfhl-api`</strong> project from your Vercel Dashboard.</p>
          </div>
        )}

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
          <div className="mt-4 text-xs font-mono bg-slate-800 p-2 rounded-lg border border-slate-700">
            <p className="text-slate-400">DEBUG: API Endpoint currently in use:</p>
            <p className="text-amber-300 break-all">{API_ENDPOINT}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;