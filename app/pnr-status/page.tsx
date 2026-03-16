'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PNRStatusPage() {
  const [pnr, setPnr] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pnr.trim()) return;
    router.push(`/ticket/${pnr.trim()}`);
  };

  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <div className="bg-white rounded-[2.5rem] shadow-premium p-10 border border-gray-100">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl shadow-indigo-100">
            🎫
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Check PNR Status</h1>
          <p className="text-gray-500 font-medium">Enter your 10 or 11 digit PNR number to get booking details.</p>
        </div>

        <form onSubmit={handleSearch} className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              value={pnr}
              onChange={(e) => setPnr(e.target.value)}
              placeholder="Enter PNR Number"
              className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-brand/20 focus:bg-white focus:ring-4 focus:ring-brand/5 transition-all text-xl font-bold tracking-widest placeholder:text-gray-300 placeholder:font-bold placeholder:tracking-normal"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-brand text-white font-black rounded-2xl hover:bg-brand-hover shadow-xl shadow-brand/20 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-3 text-lg"
          >
            <span>Search Booking Details</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-gray-50 text-center">
          <p className="text-sm text-gray-400 font-medium">
            Where can I find my PNR? 
            <span className="text-brand font-bold ml-1 cursor-help hover:underline">Check your e-ticket</span>
          </p>
        </div>
      </div>
    </div>
  );
}
