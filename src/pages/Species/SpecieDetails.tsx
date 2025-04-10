import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCachedFetch } from '../../hooks/useCachedFetch';
import { Species } from '../../types/api';
import { useData } from '../../context/DataContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

export default function SpecieDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const specieId = Number(id);

  const { state } = useData();
  const { data: specie, isLoading, error, refetch } = useCachedFetch<Species>(`https://swapi.dev/api/species/${id}/`);

  const allIds = (state.data.species || [])
    .map(s => parseInt(s.url.split('/').filter(Boolean).pop() || '0'))
    .filter(n => !isNaN(n));
  const sortedIds = allIds.sort((a, b) => a - b);
  const index = sortedIds.indexOf(specieId);
  const nextId = sortedIds[index + 1];
  const prevId = sortedIds[index - 1];

  if (isLoading || !specie) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  const imageUrl = `https://robohash.org/${specie.name}?set=set2&size=300x300`;

  return (
    <div className="container mx-auto px-6 py-12 text-white">
      <Link to="/species" className="text-yellow-400 hover:underline mb-6 inline-block">
        ← Back to Species
      </Link>

      <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700 rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row gap-10 items-center">
        <img
          src={imageUrl}
          alt={specie.name}
          className="rounded-2xl w-72 h-72 object-cover border-4 border-yellow-500 shadow-lg"
          onError={(e) => (e.currentTarget.src = '/placeholder-specie.png')}
        />
        <div className="text-gray-200 w-full">
          <h1 className="text-5xl font-extrabold text-yellow-400 mb-8">{specie.name}</h1>
          <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-[16px]">
            <p><span className="font-semibold text-white">Classification:</span> {specie.classification}</p>
            <p><span className="font-semibold text-white">Designation:</span> {specie.designation}</p>
            <p><span className="font-semibold text-white">Language:</span> {specie.language}</p>
            <p><span className="font-semibold text-white">Average Lifespan:</span> {specie.average_lifespan}</p>
            <p><span className="font-semibold text-white">Average Height:</span> {specie.average_height} cm</p>
            <p><span className="font-semibold text-white">Skin Colors:</span> {specie.skin_colors}</p>
            <p><span className="font-semibold text-white">Hair Colors:</span> {specie.hair_colors}</p>
            <p><span className="font-semibold text-white">Eye Colors:</span> {specie.eye_colors}</p>
            <p><span className="font-semibold text-white">Homeworld:</span> {specie.homeworld || 'Unknown'}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-10 items-center text-yellow-400 text-lg p-8">
        <button
          onClick={() => navigate(`/species/${prevId}`)}
          disabled={prevId === undefined}
          className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <button
          onClick={() => navigate(`/species/${nextId}`)}
          disabled={nextId === undefined}
          className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
