'use client';

import { forgotPassword } from '@/actions/authActions';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const email = formData.get('email') as string;
    const result = await forgotPassword(email);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
      <h1 className="text-3xl font-black text-gray-900 mb-2">Forgot Password</h1>
      <p className="text-gray-500 mb-8">Enter your email and we'll send you a reset link.</p>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold border border-red-100">
          ⚠️ {error}
        </div>
      )}

      {success ? (
        <div className="bg-green-50 text-green-600 p-6 rounded-2xl text-center border border-green-100">
          <p className="font-bold text-lg mb-2">Check your email! 📧</p>
          <p className="text-sm opacity-90">We've sent a password reset link to your inbox.</p>
          <Link href="/login" className="mt-6 inline-block text-indigo-600 font-bold hover:underline">Return to Login</Link>
        </div>
      ) : (
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
          
          <button 
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transform hover:scale-[1.01] transition-all shadow-lg text-lg disabled:opacity-50"
          >
            {loading ? 'Sending link...' : 'Send Reset Link'}
          </button>

          <div className="text-center mt-6">
            <Link href="/login" className="text-indigo-600 font-bold hover:underline text-sm uppercase tracking-widest">Back to Login</Link>
          </div>
        </form>
      )}
    </div>
  );
}
