'use client';

import Link from 'next/link';
import { logout } from '@/actions/authActions';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar({ user }: { user: any }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trains', href: '/' },
    { name: 'PNR Status', href: '#' },
    { name: 'Running Status', href: '#' },
    { name: 'Seat Availability', href: '#' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-2xl py-2' : 'bg-slate-900 py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-black text-brand tracking-tighter flex items-center space-x-2">
              <span className="text-3xl">🚄</span>
              <span className="hidden sm:block">RailConnect</span>
            </Link>
            
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${pathname === link.href ? 'text-white bg-brand/20' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4 mr-4 text-sm font-bold text-slate-400 border-r border-slate-800 pr-6">
              <Link href="#" className="hover:text-brand transition-colors">Offers</Link>
              <Link href="#" className="hover:text-brand transition-colors">Support</Link>
            </div>

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-tight">Member</span>
                  <span className="text-sm font-bold text-white">{user.name}</span>
                </div>
                <div className="h-10 w-10 rounded-full bg-brand text-white font-black flex items-center justify-center border-2 border-slate-700 shadow-lg ring-2 ring-brand/20">
                  {user.name[0].toUpperCase()}
                </div>
                <button 
                  onClick={() => logout()} 
                  className="p-2 text-slate-400 hover:text-brand transition-colors flex items-center gap-2"
                  title="Logout"
                >
                  <span className="text-sm font-bold">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className="px-5 py-2.5 text-sm font-bold text-slate-200 hover:text-white transition-all">
                  Login
                </Link>
                <Link href="/register" className="px-6 py-2.5 text-sm font-bold bg-brand text-white rounded-full hover:bg-brand-hover shadow-lg shadow-brand/20 transition-all transform hover:scale-[1.02]">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
