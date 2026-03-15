export const dynamic = 'force-dynamic';

import { searchTrains } from '@/actions/trainActions';
import TrainCard from '@/components/TrainCard';
import Link from 'next/link';

export default async function SearchResults({
  searchParams,
}: {
  searchParams: Promise<{ source?: string; destination?: string; date?: string }>;
}) {
  const { source, destination, date } = await searchParams;

  if (!source || !destination || !date) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Invalid Search Parameters</h2>
        <Link href="/" className="text-indigo-600 hover:underline mt-4 block">Go back home</Link>
      </div>
    );
  }

  const trains = await searchTrains(source, destination, date);

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-8 flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
          <p className="text-gray-500">
            {source} → {destination} | {new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <Link href="/" className="bg-gray-100 text-gray-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors">
          Modify Search
        </Link>
      </div>

      <div className="space-y-6">
        {trains.length > 0 && !(trains as any)._debug ? (
          (trains as any[]).map((train) => (
            <TrainCard key={train.id} train={train} date={date} />
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <div className="text-5xl mb-4">🚆</div>
            <h2 className="text-xl font-bold text-gray-900">No Trains Found</h2>
            <p className="text-gray-500 mt-2">Try searching with a different source or destination.</p>
            
            {/* Nuclear Debug Info */}
            <div className="mt-8 p-6 bg-red-50 border border-red-100 rounded-2xl text-left inline-block w-full max-w-2xl mx-auto overflow-hidden">
              <p className="text-xs font-black text-red-600 uppercase tracking-widest mb-4 border-b border-red-200 pb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                System Diagnostic Information
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-tighter">Search Request</h4>
                  <pre className="text-[11px] text-gray-700 font-mono bg-white p-3 rounded-lg border border-red-100">
                    Source: {source}
                    Destination: {destination}
                    Date: {date}
                  </pre>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-tighter">Database State</h4>
                  <pre className="text-[11px] text-gray-700 font-mono bg-white p-3 rounded-lg border border-red-100">
                    Total Trains: {(trains as any)._debug?.totalTrainsInDb ?? 'N/A'}
                    Total Stations: {(trains as any)._debug?.allStationCodes?.length ?? 'N/A'}
                  </pre>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-tighter">Available Station Codes (DB)</h4>
                <div className="flex flex-wrap gap-2">
                  {(trains as any)._debug?.allStationCodes?.map((code: string) => (
                    <span key={code} className="px-2 py-1 bg-white border border-red-100 rounded text-[10px] font-bold text-red-700">{code}</span>
                  )) || <span className="text-xs text-gray-500 italic">No stations found in database.</span>}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-tighter">Train Sample (DB)</h4>
                <pre className="text-[10px] text-gray-600 font-mono bg-white p-3 rounded-lg border border-red-100 overflow-x-auto">
                  {JSON.stringify((trains as any)._debug?.sampleTrainsInDb, null, 2)}
                </pre>
              </div>
            </div>

            <Link href="/" className="mt-8 block w-fit mx-auto bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
              Try Another Search
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
