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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-premium py-2' : 'bg-transparent py-4'}`}>
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
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${pathname === link.href ? 'text-brand bg-brand/5' : 'text-gray-600 hover:text-brand hover:bg-gray-50'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4 mr-4 text-sm font-medium text-gray-500 border-r border-gray-100 pr-6">
              <Link href="#" className="hover:text-brand transition-colors">Offers</Link>
              <Link href="#" className="hover:text-brand transition-colors">Support</Link>
            </div>

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Welcome back</span>
                  <span className="text-sm font-bold text-gray-900">{user.name}</span>
                </div>
                <div className="h-10 w-10 rounded-full bg-accent text-brand font-black flex items-center justify-center border-2 border-white shadow-sm">
                  {user.name[0].toUpperCase()}
                </div>
                <button 
                  onClick={() => logout()} 
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <span className="text-xl">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className="px-5 py-2.5 text-sm font-bold text-gray-700 hover:text-brand transition-all">
                  Login
                </Link>
                <Link href="/register" className="px-6 py-2.5 text-sm font-bold bg-gray-900 text-white rounded-full hover:bg-black shadow-lg shadow-gray-200 transition-all transform hover:scale-[1.02]">
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
