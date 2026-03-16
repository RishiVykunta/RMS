'use client';

import { useState } from 'react';
import { getRunningStatus } from '@/actions/trainActions';

export default function RunningStatusPage() {
  const [trainNumber, setTrainNumber] = useState('');
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainNumber.trim()) return;
    setLoading(true);
    setError('');
    setStatus(null);
    try {
      const result = await getRunningStatus(trainNumber.trim());
      if (result) {
        setStatus(result);
      } else {
        setError('Train not found. Please check the number.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="bg-white rounded-[2.5rem] shadow-premium p-8 border border-gray-100 mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
          <span className="text-4xl">🏃</span> Running Status
        </h1>
        <form onSubmit={handleSearch} className="flex gap-4">
          <input 
            type="text" 
            placeholder="Enter Train Number (e.g. 12842)"
            value={trainNumber}
            onChange={(e) => setTrainNumber(e.target.value)}
            className="flex-1 px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-brand/20 focus:bg-white focus:ring-4 focus:ring-brand/5 transition-all font-bold text-lg"
            required
          />
          <button 
            type="submit"
            disabled={loading}
            className="bg-brand text-white px-8 py-4 rounded-2xl font-black hover:bg-brand-hover transition-all disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Check Status'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl font-bold border border-red-100 text-center animate-in fade-in slide-in-from-top-2">
          {error}
        </div>
      )}

      {status && (
        <div className="bg-white rounded-[2.5rem] shadow-premium p-10 border border-gray-100 animate-in fade-in zoom-in-95 duration-500">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Live Status for</p>
              <h2 className="text-2xl font-black text-gray-900">{status.trainName} ({trainNumber})</h2>
            </div>
            <div className="bg-green-50 text-green-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-green-100 animate-pulse">
              Live updates
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-brand to-indigo-500 rounded-full" />
            
            <div className="ml-16 space-y-12">
              <div className="relative">
                <div className="absolute -left-[52px] w-10 h-10 rounded-full bg-white border-4 border-brand flex items-center justify-center text-sm shadow-lg">
                  ✅
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Last Departed</p>
                  <p className="text-xl font-bold text-gray-900">{status.lastDeparted}</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[52px] w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center text-xl shadow-xl shadow-brand/20 animate-bounce">
                  🚆
                </div>
                <div className="bg-brand/5 p-6 rounded-3xl border border-brand/10">
                  <p className="text-xs font-bold text-brand uppercase tracking-widest mb-1">Current Status</p>
                  <p className="text-2xl font-black text-brand tracking-tight">{status.status}</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[52px] w-10 h-10 rounded-full bg-white border-4 border-indigo-500 flex items-center justify-center text-sm shadow-lg">
                  📍
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Next Station</p>
                  <p className="text-xl font-bold text-gray-900 mb-1">{status.nextStation}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-indigo-500">Expected at {status.expectedArrival}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
