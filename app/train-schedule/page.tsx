'use client';

import { useState } from 'react';
import { getTrainSchedule } from '@/actions/trainActions';

export default function TrainSchedulePage() {
  const [trainNumber, setTrainNumber] = useState('');
  const [schedule, setSchedule] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainNumber.trim()) return;
    setLoading(true);
    setSchedule(null);
    setError('');
    try {
      const result = await getTrainSchedule(trainNumber.trim());
      if (result) {
        setSchedule(result);
      } else {
        setError('Train not found.');
      }
    } catch (err) {
      setError('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="bg-white rounded-[2.5rem] shadow-premium p-8 border border-gray-100 mb-12">
        <h1 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
          <span className="text-4xl">📅</span> Train Schedule
        </h1>
        <form onSubmit={handleSearch} className="flex gap-4">
          <input 
            type="text" 
            placeholder="Enter Train Number (e.g. 12842)"
            value={trainNumber}
            onChange={(e) => setTrainNumber(e.target.value)}
            className="flex-1 px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-brand/20 focus:bg-white transition-all font-bold"
            required
          />
          <button 
            type="submit"
            className="bg-brand text-white px-10 py-4 rounded-2xl font-black hover:bg-brand-hover shadow-xl shadow-brand/20 transition-all active:scale-95"
          >
            {loading ? 'Fetching...' : 'View Timetable'}
          </button>
        </form>
      </div>

      {schedule && (
        <div className="bg-white rounded-[2.5rem] shadow-premium overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="p-10 bg-gradient-to-r from-brand to-indigo-600 text-white">
            <h2 className="text-3xl font-black mb-1">{schedule.trainName}</h2>
            <p className="opacity-80 font-bold uppercase tracking-widest text-sm">Train #{schedule.trainNumber} Full Schedule</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <th className="px-8 py-5">#</th>
                  <th className="px-8 py-5">Station</th>
                  <th className="px-8 py-5">Arrives</th>
                  <th className="px-8 py-5">Departs</th>
                  <th className="px-8 py-5">Stop</th>
                  <th className="px-8 py-5">Distance</th>
                  <th className="px-8 py-5 text-right">Day</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {schedule.routes.map((route: any) => (
                  <tr key={route.id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="px-8 py-5 text-sm font-bold text-gray-400">{route.stopNumber}</td>
                    <td className="px-8 py-5">
                      <p className="text-base font-black text-gray-900">{route.station.stationName}</p>
                      <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{route.station.stationCode}</p>
                    </td>
                    <td className="px-8 py-5 font-bold text-gray-700">{route.arrivalTime}</td>
                    <td className="px-8 py-5 font-bold text-gray-700">{route.departureTime}</td>
                    <td className="px-8 py-5 text-sm text-gray-500 font-medium">{route.stopDuration || '-'}</td>
                    <td className="px-8 py-5 text-sm text-gray-500 font-bold">{route.distance}</td>
                    <td className="px-8 py-5 text-right">
                      <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-lg text-xs font-black">Day {route.day}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
