'use client';

import { useState, useEffect } from 'react';
import { getStations } from '@/actions/trainActions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const [stations, setStations] = useState<any[]>([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [travelClass, setTravelClass] = useState('All Classes');
  const [quota, setQuota] = useState('General');
  const router = useRouter();

  useEffect(() => {
    getStations().then(setStations);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!source || !destination || !date) return;
    router.push(`/search?source=${source}&destination=${destination}&date=${date}&class=${travelClass}&quota=${quota}`);
  };

  const swapStations = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };

  const quickTools = [
    { icon: '🏃', title: 'Running Status', desc: 'Check live train location' },
    { icon: '🎫', title: 'PNR Status', desc: 'Check booking confirmation' },
    { icon: '💺', title: 'Seat Availability', desc: 'Check available seats' },
    { icon: '📅', title: 'Train Schedule', desc: 'View full train timetable' },
    { icon: '🚉', title: 'Platform Locator', desc: 'Find your platform number' },
    { icon: '⚡', title: 'Tatkal Guide', desc: 'Tips for faster booking' },
  ];

  const popularTrains = [
    { name: 'Rajdhani Express', number: '12951', route: 'Mumbai → Delhi', time: '16:35 - 08:35' },
    { name: 'Shatabdi Express', number: '12002', route: 'Delhi → Bhopal', time: '06:00 - 14:40' },
    { name: 'Duronto Express', number: '12267', route: 'Mumbai → Ahmedabad', time: '23:10 - 05:55' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-12 pb-32 overflow-hidden bg-white">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-6">
              Where to <span className="text-brand">next?</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">Book your train tickets with RailConnect — fast, secure, and premium experience guaranteed.</p>
          </div>

          {/* Elevated Booking Card */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white p-3 md:p-4">
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-2 cursor-default">
                
                {/* From Station */}
                <div className="p-6 md:border-r border-gray-100 group relative bg-gray-50/50 rounded-2xl md:rounded-r-none">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block px-1">From Station</label>
                  </div>
                  <select 
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full bg-transparent text-lg font-bold text-gray-900 outline-none appearance-none cursor-pointer focus:text-brand transition-colors"
                    required
                  >
                    <option value="">Select Station</option>
                    {stations.map((s) => (
                      <option key={s.id} value={s.stationCode}>{s.stationName} ({s.stationCode})</option>
                    ))}
                  </select>
                  {/* Swap Button */}
                  <button 
                    type="button"
                    onClick={swapStations}
                    className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-100 shadow-lg flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all invisible md:visible group-hover:scale-110 active:scale-95"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                  </button>
                </div>

                {/* To Station */}
                <div className="p-6 md:border-r border-gray-100 group bg-gray-50/50 rounded-2xl md:rounded-none">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block px-1">To Station</label>
                  </div>
                  <select 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-transparent text-lg font-bold text-gray-900 outline-none appearance-none cursor-pointer focus:text-brand transition-colors"
                    required
                  >
                    <option value="">Select Station</option>
                    {stations.map((s) => (
                      <option key={s.id} value={s.stationCode}>{s.stationName} ({s.stationCode})</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="p-6 md:border-r border-gray-100 group bg-gray-50/50 rounded-2xl md:rounded-none">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block px-1">Travel Date</label>
                  </div>
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-transparent text-lg font-bold text-gray-900 outline-none cursor-pointer focus:text-brand transition-colors"
                    required
                  />
                </div>

                {/* Class & Quota */}
                <div className="p-6 md:border-r border-gray-100 md:col-span-1 group bg-gray-50/50 rounded-2xl md:rounded-none">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block px-1">Class</label>
                  </div>
                  <select 
                    value={travelClass}
                    onChange={(e) => setTravelClass(e.target.value)}
                    className="w-full bg-transparent text-lg font-bold text-gray-900 outline-none appearance-none cursor-pointer focus:text-brand transition-colors"
                  >
                    <option value="All Classes">All Classes</option>
                    <option value="SLEEPER">Sleeper (SL)</option>
                    <option value="AC_3_ECONOMY">AC 3 Economy (3E)</option>
                    <option value="AC_3_TIER">AC 3 Tier (3A)</option>
                    <option value="AC_2_TIER">AC 2 Tier (2A)</option>
                    <option value="AC_FIRST_CLASS">AC First Class (1A)</option>
                  </select>
                </div>

                {/* Search Button */}
                <div className="p-2 flex items-center h-full">
                  <button 
                    type="submit"
                    className="w-full h-16 md:h-full bg-brand text-white font-black rounded-2xl hover:bg-brand-hover shadow-[0_10px_25px_rgba(16,185,129,0.3)] transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-2 text-xl"
                  >
                    <span className="hidden lg:inline">Search Trains</span>
                    <span className="lg:hidden">Search</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tools Section */}
      <section className="bg-gray-50 py-24 -mt-16 relative z-10 rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
            {quickTools.map((tool) => (
              <Link 
                href={tool.title === 'PNR Status' ? '/pnr-status' : '#'} 
                key={tool.title} 
                className="bg-white p-6 rounded-[2rem] shadow-premium shadow-hover cursor-pointer border border-transparent hover:border-brand/10 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{tool.title}</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-brand to-accent rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 text-8xl opacity-10 font-black text-white">OFFER</div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl font-black mb-6">Alternate Travel Plan</h2>
              <p className="text-lg opacity-90 mb-8 font-medium">
                If your ticket remains waitlisted, get alternate train suggestions and increase your chances of confirmed seats.
              </p>
              <button className="bg-white text-brand px-10 py-4 rounded-full font-black hover:bg-gray-50 transition-all shadow-xl shadow-brand/20">
                Explore More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Trains Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Popular Routes</h2>
              <p className="text-gray-500 font-medium">Trending destinations this season</p>
            </div>
            <button className="text-brand font-bold hover:underline">View All Routes →</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularTrains.map((train) => (
              <div key={train.number} className="bg-white p-8 rounded-[2.5rem] shadow-premium shadow-hover border border-gray-100 relative group overflow-hidden">
                <div className="absolute top-0 right-0 bg-brand/10 text-brand px-4 py-2 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest">
                  #{train.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{train.name}</h3>
                <div className="text-brand font-black text-sm mb-6 pb-6 border-b border-gray-50">
                  {train.route}
                </div>
                <div className="flex justify-between items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                  <span>Departure</span>
                  <span>Arrival</span>
                </div>
                <div className="flex justify-between items-center text-gray-900 font-black text-lg mt-1">
                  <span>{train.time.split(' - ')[0]}</span>
                  <div className="flex-grow mx-4 h-[2px] bg-gray-100 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand text-[10px]">🚄</div>
                  </div>
                  <span>{train.time.split(' - ')[1]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center group">
              <div className="w-20 h-20 rounded-[2rem] bg-indigo-50 text-indigo-500 flex items-center justify-center text-4xl mb-8 mx-auto group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 shadow-xl shadow-indigo-100">
                🎫
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Easy Booking</h3>
              <p className="text-gray-500 leading-relaxed font-medium">Book your train tickets in just a few clicks with our intuitive and powerful platform.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 rounded-[2rem] bg-brand/5 text-brand flex items-center justify-center text-4xl mb-8 mx-auto group-hover:bg-brand group-hover:text-white transition-all duration-500 shadow-xl shadow-brand/10">
                ⚡
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Instant PNR</h3>
              <p className="text-gray-500 leading-relaxed font-medium">Get your PNR number and confirmation instantly after your transaction is complete.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 rounded-[2rem] bg-green-50 text-green-500 flex items-center justify-center text-4xl mb-8 mx-auto group-hover:bg-green-500 group-hover:text-white transition-all duration-500 shadow-xl shadow-green-100">
                🔒
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Secure Payments</h3>
              <p className="text-gray-500 leading-relaxed font-medium">Your data and payments are protected with state-of-the-art encryption and security.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
