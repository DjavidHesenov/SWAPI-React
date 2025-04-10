import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCachedFetch } from '../../hooks/useCachedFetch';
import { Person } from '../../types/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { useData } from '../../context/DataContext';

export default function PeopleDetails() {
  const { id } = useParams<{ id: string }>();
  const { state } = useData();
  const navigate = useNavigate();
  const personId = Number(id);
  const { data: person, isLoading, error, refetch } = useCachedFetch<Person>(`https://swapi.dev/api/people/${id}/`);

  // ✅ Get all valid person IDs from context
  const allIds = (state.data.people || [])
    .map(p => parseInt(p.url.split('/').filter(Boolean).pop() || '0'))
    .filter(n => !isNaN(n));
  const sortedIds = allIds.sort((a, b) => a - b);
  const personIndex = sortedIds.indexOf(personId);
  const nextId = sortedIds[personIndex + 1];
  const prevId = sortedIds[personIndex - 1];

  if (error) return <ErrorMessage message={"Not Found."} onRetry={refetch} />;
  if (isLoading || !person) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-6 py-12">
      <Link
        to="/people"
        className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-6"
      >
        ← Back to Characters
      </Link>

      <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700 rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row gap-10 items-center">
        <img
          src={`https://robohash.org/${person.name}?set=set2&size=300x300`}
          alt={person.name}
          className="rounded-2xl w-72 h-72 object-cover shadow-lg border-4 border-yellow-500"
        />
        <div className="text-gray-200">
          <h1 className="text-5xl font-extrabold text-yellow-400 mb-10">{person.name}</h1>
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-[16px]">
            <p><span className="font-semibold text-white">Birth Year:</span> {person.birth_year}</p>
            <p><span className="font-semibold text-white">Gender:</span> {person.gender}</p>
            <p><span className="font-semibold text-white">Height:</span> {person.height} cm</p>
            <p><span className="font-semibold text-white">Mass:</span> {person.mass} kg</p>
            <p><span className="font-semibold text-white">Hair Color:</span> {person.hair_color}</p>
            <p><span className="font-semibold text-white">Eye Color:</span> {person.eye_color}</p>
            <p><span className="font-semibold text-white">Skin Color:</span> {person.skin_color}</p>
          </div>
        </div>
      </div>

      {/* --- Navigation Buttons --- */}
      <div className="flex justify-center gap-10 items-center text-yellow-400 text-lg p-8">
        <button
          onClick={() => navigate(`/people/${prevId}`)}
          disabled={prevId === undefined}
          className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <button
          onClick={() => navigate(`/people/${nextId}`)}
          disabled={nextId === undefined}
          className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
