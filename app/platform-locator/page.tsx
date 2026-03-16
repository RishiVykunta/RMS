'use client';

import { useState } from 'react';
import { getPlatformLocator } from '@/actions/trainActions';

export default function PlatformLocatorPage() {
  const [trainNumber, setTrainNumber] = useState('');
  const [stationCode, setStationCode] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError('');
    try {
      const data = await getPlatformLocator(trainNumber.trim(), stationCode.trim());
      if (data) {
        setResult(data);
      } else {
        setError('Data not found for this train and station combination.');
      }
    } catch (err) {
      setError('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-white rounded-[2.5rem] shadow-premium p-10 border border-gray-100">
        <h1 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
          <span className="text-4xl">🚉</span> Platform Locator
        </h1>
        
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Train Number</label>
            <input 
              type="text" 
              placeholder="e.g. 12842"
              value={trainNumber}
              onChange={(e) => setTrainNumber(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-brand/20 focus:bg-white transition-all font-bold"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Station Code</label>
            <input 
              type="text" 
              placeholder="e.g. VSKP"
              value={stationCode}
              onChange={(e) => setStationCode(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-brand/20 focus:bg-white transition-all font-bold uppercase"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-brand text-white rounded-2xl font-black hover:bg-brand-hover shadow-xl shadow-brand/20 transition-all active:scale-95 text-lg"
          >
            {loading ? 'Locating...' : 'Find Platform'}
          </button>
        </form>

        {error && (
          <div className="mt-8 bg-red-50 text-red-600 p-4 rounded-xl font-bold text-center border border-red-100">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-12 p-10 bg-brand/5 rounded-3xl border-2 border-brand/10 text-center animate-in zoom-in-95">
            <p className="text-sm font-bold text-brand uppercase tracking-widest mb-2">{result.trainName}</p>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Arriving at {result.stationName}</h2>
            
            <div className="inline-flex flex-col items-center justify-center bg-white rounded-[3rem] shadow-xl shadow-brand/10 border border-brand/10 mb-4 px-12 py-10 text-center min-w-[240px] max-w-full">
              <span className="text-sm font-black text-gray-400 uppercase tracking-widest block mb-4">Platform</span>
              <div className="relative">
                <span className={`font-black text-brand leading-none bg-clip-text text-transparent bg-gradient-to-br from-brand to-brand-hover block ${
                  result.platform.length > 2 ? 'text-4xl' : 'text-9xl'
                }`}>
                  {result.platform}
                </span>
                {result.platform.length <= 2 && (
                  <div className="absolute -inset-4 bg-brand/5 blur-2xl rounded-full -z-10 animate-pulse" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
