'use client';

import { login } from '@/actions/authActions';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
      <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome Back</h1>
      <p className="text-gray-500 mb-8">Login to manage your railway reservations.</p>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold border border-red-100">
          ⚠️ {error}
        </div>
      )}

      <form action={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-black uppercase tracking-wider pl-1">Email Address</label>
          <input 
            name="email" 
            type="email" 
            className="w-full p-4 bg-white border-2 border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-black font-semibold" 
            placeholder="your@email.com"
            required 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-black uppercase tracking-wider pl-1">Password</label>
          <input 
            name="password" 
            type="password" 
            className="w-full p-4 bg-white border-2 border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-black font-semibold" 
            placeholder="••••••••"
            required 
          />
        </div>
        
        <button 
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transform hover:scale-[1.01] transition-all shadow-lg text-lg disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-gray-100 text-center">
        <p className="text-gray-500">Don't have an account? <Link href="/register" className="text-indigo-600 font-bold hover:underline">Register Now</Link></p>
      </div>
    </div>
  );
}
