'use client';

import { login } from '@/actions/authActions';
import Link from 'next/link';
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogin } from '@/actions/authActions';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
      if (result.redirect) {
        window.location.href = result.redirect;
      }
    }
  }

  const handleGoogleSuccess = async (response: any) => {
    setLoading(true);
    await googleLogin(response.credential);
  };

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
          <div className="flex justify-between items-center px-1">
            <label className="text-sm font-bold text-black uppercase tracking-wider">Password</label>
            <Link href="/forgot-password" title="Forgot Password?" className="text-xs font-bold text-indigo-600 hover:underline">Forgot Password?</Link>
          </div>
          <div className="relative">
            <input 
              name="password" 
              type={showPassword ? 'text' : 'password'} 
              className="w-full p-4 bg-white border-2 border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-black font-semibold" 
              placeholder="••••••••"
              required 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest transition-colors"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        
        <button 
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transform hover:scale-[1.01] transition-all shadow-lg text-lg disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Sign In'}
        </button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500 font-bold uppercase tracking-widest text-[10px]">Or continue with</span>
          </div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google Login Failed')}
            theme="filled_blue"
            shape="pill"
            width="100%"
          />
        </div>
      </form>

      <div className="mt-8 pt-8 border-t border-gray-100 text-center">
        <p className="text-gray-500">Don't have an account? <Link href="/register" className="text-indigo-600 font-bold hover:underline">Register Now</Link></p>
      </div>
    </div>
  );
}
