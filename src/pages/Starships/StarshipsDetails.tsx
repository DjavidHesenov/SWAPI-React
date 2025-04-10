import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCachedFetch } from '../../hooks/useCachedFetch';
import { Starship } from '../../types/api';
import { useData } from '../../context/DataContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

export default function StarshipDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const starshipId = Number(id);

  const { state } = useData();
  const {
    data: starship,
    isLoading,
    error,
    refetch
  } = useCachedFetch<Starship>(`https://swapi.dev/api/starships/${id}/`);

  const allIds = (state.data.starships || [])
    .map(s => parseInt(s.url.split('/').filter(Boolean).pop() || '0'))
    .filter(n => !isNaN(n));
  const sortedIds = allIds.sort((a, b) => a - b);
  const index = sortedIds.indexOf(starshipId);
  const nextId = sortedIds[index + 1];
  const prevId = sortedIds[index - 1];

  if (error) return <ErrorMessage message={"Not found."} onRetry={refetch} />;
  if (isLoading || !starship) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-6 py-12">
      <Link
        to="/starships"
        className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-6"
      >
        ← Back to Starships
      </Link>

      <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700 rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row gap-10 items-center">
        <img
          src={`https://robohash.org/${encodeURIComponent(starship.name)}?set=set3&size=300x300`}
          alt={starship.name}
          className="rounded-2xl w-72 h-72 object-cover shadow-lg border-4 border-yellow-500"
        />
        <div className="text-gray-200 w-full">
          <h1 className="text-5xl font-extrabold text-yellow-400 mb-8">{starship.name}</h1>
          <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-[16px]">
            <p><span className="font-semibold text-white">Model:</span> {starship.model}</p>
            <p><span className="font-semibold text-white">Class:</span> {starship.starship_class}</p>
            <p><span className="font-semibold text-white">Manufacturer:</span> {starship.manufacturer}</p>
            <p><span className="font-semibold text-white">Cost:</span> {starship.cost_in_credits} credits</p>
            <p><span className="font-semibold text-white">Length:</span> {starship.length} m</p>
            <p><span className="font-semibold text-white">Speed:</span> {starship.max_atmosphering_speed}</p>
            <p><span className="font-semibold text-white">Crew:</span> {starship.crew}</p>
            <p><span className="font-semibold text-white">Passengers:</span> {starship.passengers}</p>
            <p><span className="font-semibold text-white">Cargo Capacity:</span> {starship.cargo_capacity}</p>
            <p><span className="font-semibold text-white">Consumables:</span> {starship.consumables}</p>
            <p><span className="font-semibold text-white">Hyperdrive Rating:</span> {starship.hyperdrive_rating}</p>
            <p><span className="font-semibold text-white">MGLT:</span> {starship.MGLT}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-10 items-center text-yellow-400 text-lg p-8">
        <button
          onClick={() => navigate(`/starships/${prevId}`)}
          disabled={prevId === undefined}
          className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <button
          onClick={() => navigate(`/starships/${nextId}`)}
          disabled={nextId === undefined}
          className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
