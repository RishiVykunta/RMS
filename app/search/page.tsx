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
        {trains.length > 0 ? (
          trains.map((train) => (
            <TrainCard key={train.id} train={train} date={date} />
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <div className="text-5xl mb-4">🚆</div>
            <h2 className="text-xl font-bold text-gray-900">No Trains Found</h2>
            <p className="text-gray-500 mt-2">Try searching with a different source or destination.</p>
            <Link href="/" className="mt-6 inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold">
              Try Another Search
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
