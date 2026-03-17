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
            <div className="flex items-center justify-between text-indigo-700 font-extrabold text-xl">
              <div className="flex items-center space-x-3">
                <span className="bg-indigo-50 px-3 py-1 rounded-lg text-sm">{train.trainNumber}</span>
                <span>{train.trainName}</span>
              </div>
              <button 
                onClick={() => setShowSchedule(!showSchedule)}
                className="text-[11px] text-indigo-600 font-bold hover:underline uppercase tracking-widest flex items-center gap-1 bg-indigo-50/50 px-3 py-1.5 rounded-lg border border-indigo-100 transition-colors hover:bg-indigo-100"
              >
                {showSchedule ? 'Hide Schedule' : 'View Schedule'}
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform ${showSchedule ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
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
                <div className="text-[10px] text-gray-400 font-black mt-2 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                  {train.journeyDuration}
                </div>
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
          <div className="mb-6 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-100/80 text-gray-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Stn Code</th>
                    <th className="px-4 py-3">Stn Name</th>
                    <th className="px-4 py-3">Arrives</th>
                    <th className="px-4 py-3">Departs</th>
                    <th className="px-4 py-3">Stop time</th>
                    <th className="px-4 py-3">Distance</th>
                    <th className="px-4 py-3">Platform</th>
                    <th className="px-4 py-3">Day</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {train.routes.sort((a: any, b: any) => a.stopNumber - b.stopNumber).map((route: any) => (
                    <tr key={route.id} className="hover:bg-white transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-indigo-600">{route.station.stationCode}</td>
                      <td className="px-4 py-3 font-bold text-gray-700">{route.station.stationName}</td>
                      <td className="px-4 py-3 text-gray-600">{route.arrivalTime}</td>
                      <td className="px-4 py-3 text-gray-600">{route.departureTime}</td>
                      <td className="px-4 py-3 text-gray-500">{route.stopDuration || '-'}</td>
                      <td className="px-4 py-3 text-gray-500">{route.distance || '-'}</td>
                      <td className="px-4 py-3 text-gray-500">{route.platform || '-'}</td>
                      <td className="px-4 py-3 font-bold text-gray-900">{route.day}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Train Classes / Pricing / Availability */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {train.classes.map((cls: any) => (
            <Link 
              key={cls.id}
              href={`/booking?trainId=${train.id}&classId=${cls.id}&date=${date}`}
              className="group border border-gray-100 rounded-2xl p-4 hover:bg-[#003366] hover:border-[#003366] hover:shadow-[0_20px_40px_rgba(0,51,102,0.2)] transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden relative"
            >
              {/* Subtle Pattern Hover Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="1" fill="none" />
                </svg>
              </div>

              <div className="relative z-10">
                <span className="block text-[10px] font-black text-gray-400 group-hover:text-blue-200 uppercase tracking-widest mb-1 transition-colors">{cls.type.replace(/_/g, ' ')}</span>
                <span className="block text-2xl font-black text-gray-900 group-hover:text-white leading-none transition-colors">₹{cls.price}</span>
              </div>
              <div className="mt-4 flex items-center justify-between relative z-10">
                <span className={`text-[11px] font-black px-2 py-0.5 rounded group-hover:bg-white/20 transition-all ${
                  cls.availableSeats > 20 ? 'text-green-600 group-hover:text-green-300' : 
                  cls.availableSeats > 0 ? 'text-orange-600 group-hover:text-orange-300' : 
                  'text-red-500 group-hover:text-red-300'
                }`}>
                  {cls.availableSeats > 0 ? `AVL ${cls.availableSeats}` : 'NOT AVAILABLE'}
                </span>
                <span className="text-white opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
