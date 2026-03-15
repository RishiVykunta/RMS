'use client';

import { verifyEmail } from '@/actions/authActions';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    if (!email) return;
    setLoading(true);
    setError(null);
    const code = formData.get('code') as string;
    const result = await verifyEmail(email, code);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
      <h1 className="text-3xl font-black text-gray-900 mb-2">Verify Email</h1>
      <p className="text-gray-500 mb-8">We've sent a 6-digit code to <span className="font-bold text-indigo-600">{email}</span>. Please enter it below.</p>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold border border-red-100">
          ⚠️ {error}
        </div>
      )}

      <form action={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-black uppercase tracking-wider pl-1">6-Digit Code</label>
          <input 
            name="code" 
            type="text" 
            maxLength={6}
            className="w-full p-4 bg-white border-2 border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-black font-black text-center text-3xl tracking-[0.5em]" 
            placeholder="000000"
            required 
          />
        </div>
        
        <button 
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transform hover:scale-[1.01] transition-all shadow-lg text-lg disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Verify Now'}
        </button>
      </form>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
