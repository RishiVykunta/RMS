import { getUserBookings, cancelBooking } from '@/actions/bookingActions';
import { getSession } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const bookings = await getUserBookings();

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-2 font-medium">Manage your bookings and travel history.</p>
        </div>
        <Link href="/" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all">
          Book New Ticket +
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Booking History</h2>
          <span className="bg-indigo-50 text-indigo-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-100">
            {bookings.length} Bookings Found
          </span>
        </div>

        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-widest border-b border-gray-100">
                  <th className="px-8 py-4">PNR & Date</th>
                  <th className="px-8 py-4">Train Details</th>
                  <th className="px-8 py-4">Passengers</th>
                  <th className="px-8 py-4 text-center">Status</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-black text-indigo-600 text-lg tracking-tighter">{booking.pnrNumber}</p>
                      <p className="text-xs text-gray-400 mt-1 font-bold italic">{new Date(booking.travelDate).toLocaleDateString('en-IN')}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-gray-800">{booking.train.trainName}</p>
                      <p className="text-xs text-gray-500 uppercase font-medium">{booking.train.sourceStation} → {booking.train.destinationStation}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex -space-x-2">
                        {booking.passengers.map((p, i) => (
                          <div key={p.id} className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700 uppercase" title={p.name}>
                            {p.name.charAt(0)}
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase">{booking.passengers.length} Passenger(s)</p>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                        booking.bookingStatus === 'CONFIRMED' 
                          ? 'bg-green-50 text-green-700 border-green-100' 
                          : 'bg-red-50 text-red-700 border-red-100'
                      }`}>
                        {booking.bookingStatus}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right space-x-4">
                      <Link href={`/ticket/${booking.pnrNumber}`} className="text-indigo-600 font-bold text-sm hover:underline">View Ticket</Link>
                      {booking.bookingStatus === 'CONFIRMED' && (
                        <form action={async () => {
                          'use server';
                          await cancelBooking(booking.id);
                          redirect('/dashboard');
                        }} className="inline">
                          <button className="text-red-500 font-bold text-sm hover:underline">Cancel</button>
                        </form>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-20 text-center">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-gray-900">No bookings yet</h3>
            <p className="text-gray-500 mt-2">Start your first journey by searching for trains!</p>
          </div>
        )}
      </div>
    </div>
  );
}
