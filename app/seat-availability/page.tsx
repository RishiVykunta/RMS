'use client';

import { useState, useEffect } from 'react';
import { getSeatAvailability } from '@/actions/trainActions';
import { getStations } from '@/actions/trainActions';

export default function SeatAvailabilityPage() {
  const [stations, setStations] = useState<any[]>([]);
  const [trainNumber, setTrainNumber] = useState('');
  const [classType, setClassType] = useState('SLEEPER');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getStations().then(setStations);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainNumber || !date) return;
    setLoading(true);
    setError('');
    setStatus(null);
    try {
      const result = await getSeatAvailability(trainNumber.trim(), classType, date);
      if (result) {
        setStatus(result);
      } else {
        setError('Train or class data not found.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-[2.5rem] shadow-premium p-10 border border-gray-100 mb-12">
        <h1 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
          <span className="text-4xl">💺</span> Seat Availability
        </h1>
        
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Train Number</label>
            <input 
              type="text" 
              placeholder="e.g. 12842"
              value={trainNumber}
              onChange={(e) => setTrainNumber(e.target.value)}
              className="px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-brand/20 focus:bg-white transition-all font-bold"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Class</label>
            <select 
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
              className="px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-brand/20 focus:bg-white transition-all font-bold"
            >
              <option value="SLEEPER">Sleeper (SL)</option>
              <option value="AC_3_ECONOMY">AC 3 Economy (3E)</option>
              <option value="AC_3_TIER">AC 3 Tier (3A)</option>
              <option value="AC_2_TIER">AC 2 Tier (2A)</option>
              <option value="AC_FIRST_CLASS">AC First Class (1A)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Date</label>
            <input 
              type="date" 
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              className="px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-brand/20 focus:bg-white transition-all font-bold"
              required
            />
          </div>

          <div className="flex items-end">
            <button 
              type="submit"
              disabled={loading}
              className="w-full h-[60px] bg-brand text-white rounded-2xl font-black hover:bg-brand-hover transition-all disabled:opacity-50 shadow-xl shadow-brand/20"
            >
              {loading ? 'Checking...' : 'Check Availability'}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl font-bold border border-red-100 text-center animate-in fade-in slide-in-from-top-2">
          {error}
        </div>
      )}

      {status && (
        <div className="bg-white rounded-[2.5rem] shadow-premium p-12 border border-white text-center animate-in fade-in zoom-in-95 duration-500">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">{status.trainName}</p>
          <h2 className="text-4xl font-black text-gray-900 mb-8">{status.classType.replace(/_/g, ' ')}</h2>
          
          <div className="grid grid-cols-2 gap-8 max-w-sm mx-auto">
            <div className={`p-8 rounded-[2rem] border-2 ${status.available > 0 ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Available</p>
              <p className={`text-4xl font-black ${status.available > 0 ? 'text-green-600' : 'text-red-600'}`}>{status.available}</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-gray-50 border-2 border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Capacity</p>
              <p className="text-4xl font-black text-gray-900">{status.total}</p>
            </div>
          </div>
          
          <div className="mt-12">
            <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${status.available > 20 ? 'bg-green-500' : 'bg-red-500'}`} 
                style={{ width: `${(status.available / status.total) * 100}%` }}
              />
            </div>
            <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
              {Math.round((status.available / status.total) * 100)}% seats remaining
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
