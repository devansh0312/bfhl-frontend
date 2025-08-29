import React from 'react';
import { ApiResponse } from '../types';

interface ResponseDisplayProps {
  data: ApiResponse;
}

const DataPill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="inline-block bg-slate-700 text-cyan-300 text-sm font-mono rounded-full px-3 py-1 mr-2 mb-2">
        {children}
    </span>
);

const DisplayCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-700">
        <h3 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">{title}</h3>
        <div className="text-lg text-white break-words">{children}</div>
    </div>
);


const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ data }) => {
  return (
    <div className="animate-fade-in space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <DisplayCard title="Status">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${data.is_success ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                    {data.is_success ? 'Success' : 'Failed'}
                </span>
            </DisplayCard>
             <DisplayCard title="User ID"><span className="font-mono">{data.user_id}</span></DisplayCard>
            <DisplayCard title="Email"><span className="font-mono">{data.email}</span></DisplayCard>
            <DisplayCard title="Roll Number"><span className="font-mono">{data.roll_number}</span></DisplayCard>
            <DisplayCard title="Sum of Numbers"><span className="font-mono text-xl text-amber-400">{data.sum}</span></DisplayCard>
            <DisplayCard title="Concatenated String"><span className="font-mono text-xl text-fuchsia-400">{data.concat_string}</span></DisplayCard>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-700">
                <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Categorized Arrays</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-medium text-slate-300 mb-2">Even Numbers</h4>
                        <div>{data.even_numbers.length > 0 ? data.even_numbers.map(n => <DataPill key={`even-${n}`}>{n}</DataPill>) : <span className="text-slate-500">None</span>}</div>
                    </div>
                     <div>
                        <h4 className="font-medium text-slate-300 mb-2">Odd Numbers</h4>
                        <div>{data.odd_numbers.length > 0 ? data.odd_numbers.map(n => <DataPill key={`odd-${n}`}>{n}</DataPill>) : <span className="text-slate-500">None</span>}</div>
                    </div>
                </div>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-700">
                 <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider text-transparent">.</h3>
                 <div className="space-y-4">
                    <div>
                        <h4 className="font-medium text-slate-300 mb-2">Alphabets (Uppercase)</h4>
                        <div>{data.alphabets.length > 0 ? data.alphabets.map(a => <DataPill key={`alpha-${a}`}>{a}</DataPill>) : <span className="text-slate-500">None</span>}</div>
                    </div>
                     <div>
                        <h4 className="font-medium text-slate-300 mb-2">Special Characters</h4>
                        <div>{data.special_characters.length > 0 ? data.special_characters.map(c => <DataPill key={`char-${c}`}>{c}</DataPill>) : <span className="text-slate-500">None</span>}</div>
                    </div>
                 </div>
            </div>
        </div>
    </div>
  );
};

export default ResponseDisplay;
