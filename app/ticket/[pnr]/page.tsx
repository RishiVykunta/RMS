import { getBookingByPNR } from '@/actions/bookingActions';
import Link from 'next/link';
import PrintButton from '@/components/PrintButton';

export default async function TicketPage({
  params,
}: {
  params: Promise<{ pnr: string }>;
}) {
  const { pnr } = await params;
  const booking = await getBookingByPNR(pnr);

  if (!booking) return <div className="text-center py-20 font-bold">Ticket not found</div>;

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="bg-green-600 text-white p-8 rounded-t-3xl text-center shadow-lg">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-extrabold">Booking Confirmed!</h1>
        <p className="mt-2 text-green-100 opacity-90 font-medium">Have a safe and pleasant journey.</p>
      </div>

      <div className="bg-white p-8 rounded-b-3xl shadow-xl border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between gap-8 pb-8 border-b border-dashed">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">PNR Number</span>
            <header className="text-4xl font-black text-indigo-600 tracking-tighter">{booking.pnrNumber}</header>
          </div>
          <div className="flex gap-8">
            <div className="text-right">
              <span className="text-xs font-bold text-gray-400 uppercase">Train</span>
              <p className="font-bold text-gray-900">{booking.train.trainName} ({booking.train.trainNumber})</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-gray-400 uppercase">Date</span>
              <p className="font-bold text-gray-900">{new Date(booking.travelDate).toLocaleDateString('en-IN')}</p>
            </div>
          </div>
        </div>

        <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase">From</span>
            <p className="text-lg font-bold text-indigo-800">{booking.train.sourceStation}</p>
            <p className="text-xs text-gray-500">{booking.train.departureTime}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase">To</span>
            <p className="text-lg font-bold text-indigo-800">{booking.train.destinationStation}</p>
            <p className="text-xs text-gray-500">{booking.train.arrivalTime}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Status</span>
            <p className={`text-lg font-bold uppercase ${
              (booking.bookingStatus as any) === 'CONFIRMED' ? 'text-green-600' : 
              (booking.bookingStatus as any) === 'WAITING' ? 'text-orange-500' : 'text-red-500'
            }`}>
              {booking.bookingStatus}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Total Passengers</span>
            <p className="text-lg font-bold text-gray-800">{booking.passengers.length}</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4 px-2">Passenger List</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest">
                <th className="px-6 py-3 rounded-tl-xl">Name</th>
                <th className="px-6 py-3">Age / Gender</th>
                <th className="px-6 py-3">Seat / Coach</th>
                <th className="px-6 py-3 rounded-tr-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {booking.passengers.map((p, idx) => (
                <tr key={p.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 font-bold text-gray-800">{p.name}</td>
                  <td className="px-6 py-4 text-gray-600">{p.age} / {p.gender}</td>
                  <td className="px-6 py-4 font-mono font-bold text-indigo-600 uppercase">
                    {(p as any).seatStatus === 'CONFIRMED' ? `Coach S1 - ${p.seatNumber}` : `WL - ${(p as any).waitingListNumber}`}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                        (p as any).seatStatus === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 
                        (p as any).seatStatus === 'WAITING' ? 'bg-orange-100 text-orange-700' : 
                        'bg-red-100 text-red-700'
                    }`}>
                      {p.seatStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 flex items-center justify-center space-x-4 print:hidden">
          <PrintButton />
          <a href="/dashboard" className="text-indigo-600 font-bold hover:underline">Go to Dashboard →</a>
        </div>
      </div>
    </div>
  );
}
