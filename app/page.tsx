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
    { 
      icon: (
        <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ), 
      title: 'Running Status', 
      desc: 'Check live train location' 
    },
    { 
      icon: (
        <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      ), 
      title: 'PNR Status', 
      desc: 'Check booking confirmation' 
    },
    { 
      icon: (
        <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ), 
      title: 'Seat Availability', 
      desc: 'Check available seats' 
    },
    { 
      icon: (
        <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ), 
      title: 'Train Schedule', 
      desc: 'View full train timetable' 
    },
    { 
      icon: (
        <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ), 
      title: 'Platform Locator', 
      desc: 'Find your platform number' 
    },
    { 
      icon: (
        <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ), 
      title: 'Tatkal Guide', 
      desc: 'Tips for faster booking' 
    },
  ];

  const popularTrains = [
    { name: 'Rajdhani Express', number: '12951', route: 'Mumbai → Delhi', time: '16:35 - 08:35' },
    { name: 'Shatabdi Express', number: '12002', route: 'Delhi → Bhopal', time: '06:00 - 14:40' },
    { name: 'Duronto Express', number: '12267', route: 'Mumbai → Ahmedabad', time: '23:10 - 05:55' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      {/* Hero Section */}
      <section id="top" className="relative pt-12 pb-32 overflow-hidden bg-gray-900 border-b border-white/10">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.png" 
            alt="Indian Railways" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 pt-10">
            <div className="flex items-center justify-center gap-4 mb-6 text-white/80 font-bold tracking-[0.2em] uppercase text-xs">
              <span>Safety</span>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <span>Security</span>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <span>Punctuality</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-6 drop-shadow-2xl">
              Indian <span className="text-brand">Railways</span>
            </h1>
            <p className="text-xl text-white/90 font-medium max-w-2xl mx-auto drop-shadow-lg">
              Heartily enjoy every journey through our boundless hospitality. Through Indian railways, The Lifeline of the Nation.
            </p>
          </div>

          {/* Elevated Booking Card */}
          <div id="booking-area" className="max-w-6xl mx-auto transform translate-y-8">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-white/20 p-3 md:p-4">
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
            {quickTools.map((tool) => {
              let href = '#';
              switch (tool.title) {
                case 'Running Status': href = '/running-status'; break;
                case 'PNR Status': href = '/pnr-status'; break;
                case 'Seat Availability': href = '/seat-availability'; break;
                case 'Train Schedule': href = '/train-schedule'; break;
                case 'Platform Locator': href = '/platform-locator'; break;
                case 'Tatkal Guide': href = '/tatkal-guide'; break;
              }
              return (
                <Link 
                  href={href} 
                  key={tool.title} 
                  className="bg-white p-6 rounded-[2rem] shadow-premium shadow-hover cursor-pointer border border-gray-100 hover:border-brand transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand/5 transition-all duration-300">
                    {tool.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{tool.title}</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{tool.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section id="offers" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand to-accent rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl group transition-all duration-500 hover:shadow-brand/30">
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 group-hover:scale-150 transition-transform duration-700" />
            
            <div className="absolute top-0 right-0 p-8 text-8xl opacity-5 font-black text-white select-none pointer-events-none transform rotate-[-5deg] group-hover:rotate-0 transition-all duration-500">OFFER</div>
            
            <div className="relative z-10 max-w-2xl flex flex-col items-start">
              <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-6 border border-white/20">
                Exclusive Deal
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Enjoy Zero Transaction Fees</h2>
              <p className="text-lg opacity-90 mb-10 font-medium max-w-xl">
                Book your first 3 train tickets with RailConnect and pay ₹0 in payment gateway fees. Save big on every journey this season.
              </p>
              <Link 
                href="/#top" 
                className="bg-white text-brand px-10 py-5 rounded-full font-black hover:bg-gray-50 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transform hover:-translate-y-1 flex items-center gap-3 group/btn"
              >
                <span>Book Now & Save</span>
                <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </Link>
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
            <div className="text-center group p-8 rounded-[2.5rem] hover:bg-gray-50/50 transition-all duration-500">
              <div className="w-20 h-20 rounded-[2rem] bg-indigo-50 text-indigo-500 flex items-center justify-center mb-8 mx-auto group-hover:bg-indigo-500 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-xl shadow-indigo-100 group-hover:shadow-indigo-200">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Easy Booking</h3>
              <p className="text-gray-500 leading-relaxed font-medium">Book your train tickets in just a few clicks with our intuitive and powerful platform.</p>
            </div>
            
            <div className="text-center group p-8 rounded-[2.5rem] hover:bg-gray-50/50 transition-all duration-500">
              <div className="w-20 h-20 rounded-[2rem] bg-emerald-50 text-emerald-500 flex items-center justify-center mb-8 mx-auto group-hover:bg-emerald-500 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-xl shadow-emerald-100 group-hover:shadow-emerald-200">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Instant PNR</h3>
              <p className="text-gray-500 leading-relaxed font-medium">Get your PNR number and confirmation instantly after your transaction is complete.</p>
            </div>
            
            <div className="text-center group p-8 rounded-[2.5rem] hover:bg-gray-50/50 transition-all duration-500">
              <div className="w-20 h-20 rounded-[2rem] bg-blue-50 text-blue-500 flex items-center justify-center mb-8 mx-auto group-hover:bg-blue-500 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-xl shadow-blue-100 group-hover:shadow-blue-200">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.034L3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622l-.382-3.032z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Secure Payments</h3>
              <p className="text-gray-500 leading-relaxed font-medium">Your data and payments are protected with state-of-the-art encryption and security.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
