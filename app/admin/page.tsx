import { getSystemStats, getAllBookings } from '@/actions/adminActions';
import Link from 'next/link';

export default async function AdminDashboard() {
  const stats = await getSystemStats();
  const recentBookings = await getAllBookings();

  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Admin Console</h1>
          <p className="text-gray-500 font-medium">System overview and reservation metrics.</p>
        </div>
        <Link href="/admin/trains" className="bg-white text-indigo-600 border-2 border-indigo-100 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all">
          Manage Trains ⚙️
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Trains</span>
          <p className="text-4xl font-black text-indigo-600 mt-2">{stats.trainCount}</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Users</span>
          <p className="text-4xl font-black text-green-600 mt-2">{stats.userCount}</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Bookings</span>
          <p className="text-4xl font-black text-orange-600 mt-2">{stats.bookingCount}</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Passengers Served</span>
          <p className="text-4xl font-black text-purple-600 mt-2">{stats.passengerCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50">
          <h2 className="text-2xl font-bold text-gray-800">Global Reservations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-[10px] font-bold uppercase border-b border-gray-100">
                <th className="px-8 py-4">User</th>
                <th className="px-8 py-4">PNR</th>
                <th className="px-8 py-4">Train</th>
                <th className="px-8 py-4">Passengers</th>
                <th className="px-8 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentBookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-6 uppercase font-bold text-xs text-gray-500">{b.user.name}</td>
                  <td className="px-8 py-6 font-black text-indigo-600">{b.pnrNumber}</td>
                  <td className="px-8 py-6 font-bold text-gray-800">{b.train.trainName}</td>
                  <td className="px-8 py-6 text-xs text-gray-500 font-bold">{b.passengers.length} Psg</td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase border ${
                      b.bookingStatus === 'CONFIRMED' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
                    }`}>
                      {b.bookingStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
