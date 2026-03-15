'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TrainCard({ train, date }: { train: any; date: string }) {
  const [showSchedule, setShowSchedule] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 mb-6 hover:shadow-md transition-all duration-300">
      <div className="p-6">
        {/* Train Info Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 text-indigo-700 font-extrabold text-xl">
              <span className="bg-indigo-50 px-3 py-1 rounded-lg text-sm">{train.trainNumber}</span>
              <span>{train.trainName}</span>
            </div>
            
            <div className="mt-6 flex items-center justify-between max-w-2xl">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-gray-900">{train.departureTime}</span>
                <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">{train.sourceStation}</span>
              </div>
              
              <div className="flex-grow flex flex-col items-center px-8">
                <div className="w-full flex items-center gap-2">
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 border border-indigo-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                  </div>
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                </div>
                <button 
                  onClick={() => setShowSchedule(!showSchedule)}
                  className="text-[11px] text-indigo-600 font-bold mt-2 hover:underline uppercase tracking-widest flex items-center gap-1"
                >
                  {showSchedule ? 'Hide Schedule' : 'View Schedule'}
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform ${showSchedule ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-3xl font-black text-gray-900">{train.arrivalTime}</span>
                <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">{train.destinationStation}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule View (Conditional) */}
        {showSchedule && (
          <div className="mb-6 bg-gray-50 rounded-xl p-4 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
            <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest pl-2">Train Schedule</h4>
            <div className="space-y-3">
              {train.routes.map((route: any, idx: number) => (
                <div key={route.id} className="flex items-center gap-4 text-sm">
                  <div className="w-8 flex flex-col items-center">
                    <div className={`w-2 h-2 rounded-full ${idx === 0 || idx === train.routes.length - 1 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                    {idx < train.routes.length - 1 && <div className="w-0.5 h-6 bg-gray-200"></div>}
                  </div>
                  <div className="flex-1 flex justify-between items-center pr-4">
                    <span className="font-bold text-gray-700">{route.station.stationName} ({route.station.stationCode})</span>
                    <span className="text-gray-500 font-mono">{route.arrivalTime} | {route.departureTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Train Classes / Pricing / Availability */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {train.classes.map((cls: any) => (
            <Link 
              key={cls.id}
              href={`/booking?trainId=${train.id}&classId=${cls.id}&date=${date}`}
              className="group border border-gray-100 rounded-xl p-3 hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="block text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1">{cls.type.replace(/_/g, ' ')}</span>
                <span className="block text-xl font-black text-gray-900 leading-none">₹{cls.price}</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className={`text-[11px] font-bold ${cls.availableSeats > 20 ? 'text-green-600' : cls.availableSeats > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                  {cls.availableSeats > 0 ? `AVL ${cls.availableSeats}` : 'NOT AVAILABLE'}
                </span>
                <span className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
