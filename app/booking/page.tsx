'use client';

import { useState, Suspense } from 'react';
import { createBooking } from '@/actions/bookingActions';
import { useSearchParams } from 'next/navigation';

function BookingContent() {
  const searchParams = useSearchParams();
  const trainId = searchParams.get('trainId');
  const classId = searchParams.get('classId');
  const date = searchParams.get('date');

  const [passengers, setPassengers] = useState([{ name: '', age: '', gender: 'Male' }]);
  const [loading, setLoading] = useState(false);

  const addPassenger = () => {
    setPassengers([...passengers, { name: '', age: '', gender: 'Male' }]);
  };

  const removePassenger = (index: number) => {
    setPassengers(passengers.filter((_, i) => i !== index));
  };

  const updatePassenger = (index: number, field: string, value: string) => {
    const updated = [...passengers];
    (updated[index] as any)[field] = value;
    setPassengers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainId || !classId || !date) return;
    setLoading(true);
    try {
      const result = await createBooking(trainId, classId, date, passengers as any) as { success: boolean; pnr?: string; error?: string };
      if (result.success && result.pnr) {
        window.location.href = `/ticket/${result.pnr}`;
      } else {
        alert(result.error || 'Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('A critical error occurred. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  if (!trainId || !classId || !date) return <div className="text-center py-20 font-bold text-red-500">Invalid booking parameters. Please restart your search.</div>;

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Passenger Details</h1>
        <p className="text-gray-500 mt-2">Enter details for all passengers travelling on this booking.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {passengers.map((passenger, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
            {index > 0 && (
              <button 
                type="button" 
                onClick={() => removePassenger(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-bold text-sm"
              >
                Remove
              </button>
            )}
            <h3 className="text-lg font-bold text-gray-800 mb-4">Passenger {index + 1}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                <input 
                  type="text" 
                  value={passenger.name}
                  onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Age</label>
                <input 
                  type="number" 
                  value={passenger.age}
                  onChange={(e) => updatePassenger(index, 'age', e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Age"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Gender</label>
                <select 
                  value={passenger.gender}
                  onChange={(e) => updatePassenger(index, 'gender', e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        <button 
          type="button" 
          onClick={addPassenger}
          className="w-full py-3 border-2 border-dashed border-indigo-200 text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-colors flex items-center justify-center space-x-2"
        >
          <span>+ Add Another Passenger</span>
        </button>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
          <div className="text-gray-500 text-sm italic">
            Your e-ticket and PNR will be generated upon confirmation.
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all transform hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? 'Confirming...' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
