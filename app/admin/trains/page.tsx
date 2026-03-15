import { getAllTrains, addTrain, deleteTrain } from '@/actions/adminActions';
import { getStations } from '@/actions/trainActions';

export default async function AdminTrainsPage() {
  const trains = await getAllTrains();
  const stations = await getStations();

  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Train Management</h1>
        <p className="text-gray-500 font-medium">Add new trains or modify existing ones in the system.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-50">
              <h2 className="text-2xl font-bold text-gray-800">All Trains</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-gray-400 text-[10px] font-bold uppercase border-b border-gray-100">
                    <th className="px-8 py-4">Number & Name</th>
                    <th className="px-8 py-4">Route</th>
                    <th className="px-8 py-4">Timings</th>
                    <th className="px-8 py-4">Capacity</th>
                    <th className="px-8 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {trains.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-6">
                        <p className="font-black text-indigo-600 tracking-tighter">{t.trainNumber}</p>
                        <p className="text-sm font-bold text-gray-800">{t.trainName}</p>
                      </td>
                      <td className="px-8 py-6 text-xs text-gray-500 uppercase font-bold">
                        {t.sourceStation} → {t.destinationStation}
                      </td>
                      <td className="px-8 py-6 text-xs font-bold text-gray-800">
                        {t.departureTime} - {t.arrivalTime}
                      </td>
                      <td className="px-8 py-6 text-xs font-bold text-green-600">
                        {t.classes.reduce((sum, c) => sum + c.capacity, 0)} Seats
                      </td>
                      <td className="px-8 py-6 text-right">
                        <form action={async () => {
                          'use server';
                          await deleteTrain(t.id);
                        }}>
                          <button className="text-red-500 hover:text-red-700 font-bold text-xs uppercase tracking-widest">Delete</button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 order-1 lg:order-2">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Train</h2>
            <form action={addTrain} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Train Number</label>
                  <input name="trainNumber" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="12345" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Train Name</label>
                  <input name="trainName" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Express" required />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">From</label>
                  <select name="sourceStation" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" required>
                    {stations.map(s => <option key={s.id} value={s.stationCode}>{s.stationName}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">To</label>
                  <select name="destinationStation" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" required>
                    {stations.map(s => <option key={s.id} value={s.stationCode}>{s.stationName}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Departure</label>
                  <input name="departureTime" type="time" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Arrival</label>
                  <input name="arrivalTime" type="time" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" required />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Total Capacity</label>
                <input name="totalSeats" type="number" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="500" required />
              </div>

              <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 shadow-lg mt-4 transition-all transform hover:scale-[1.01]">
                Register Train 🚆
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
