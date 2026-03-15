'use client';

import { resetPassword } from '@/actions/authActions';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    if (!token) return;
    setLoading(true);
    setError(null);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await resetPassword(token, formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
      <h1 className="text-3xl font-black text-gray-900 mb-2">Reset Password</h1>
      <p className="text-gray-500 mb-8">Choose a new password for your account.</p>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold border border-red-100">
          ⚠️ {error}
        </div>
      )}

      <form action={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-black uppercase tracking-wider pl-1">New Password</label>
          <input 
            name="password" 
            type="password" 
            className="w-full p-4 bg-white border-2 border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-black font-semibold" 
            placeholder="••••••••"
            required 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-black uppercase tracking-wider pl-1">Confirm New Password</label>
          <input 
            name="confirmPassword" 
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
          {loading ? 'Resetting...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
