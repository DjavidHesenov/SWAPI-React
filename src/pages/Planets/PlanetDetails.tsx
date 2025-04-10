import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCachedFetch } from '../../hooks/useCachedFetch';
import { useData } from '../../context/DataContext';
import { Planet } from '../../types/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

export default function PlanetDetails() {
    const { id } = useParams<{ id: string }>();
    const { state } = useData();
    const { data: planet, isLoading, error, refetch } = useCachedFetch<Planet>(`https://swapi.dev/api/planets/${id}/`);
    const navigate = useNavigate();
    const planetId = Number(id);

    // Dynamically calculate max ID from context data
    const allIds = (state.data.planets || [])
        .map((p) => parseInt(p.url.split('/').filter(Boolean).pop() || '0'))
        .filter((num) => !isNaN(num));
    const maxId = Math.max(...allIds);

    if (isLoading || !planet) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} onRetry={refetch} />;

    const imageUrl = `https://robohash.org/${planet.name}?set=set3&size=300x300`;

    return (
        <div className="container mx-auto px-6 py-12 text-white">
            <Link to="/planets" className="text-yellow-400 hover:underline mb-6 inline-block">
                ← Back to Planets
            </Link>

            <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700 rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row gap-10 items-center">
                <img
                    src={imageUrl}
                    alt={planet.name}
                    className="rounded-2xl w-72 h-72 object-cover border-4 border-yellow-500 shadow-lg"
                    onError={(e) => (e.currentTarget.src = '/placeholder-planet.png')}
                />
                <div className="text-gray-200 w-full">
                    <h1 className="text-5xl font-extrabold text-yellow-400 mb-8">{planet.name}</h1>
                    <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-[16px]">
                        <p><span className="font-semibold text-white">Climate:</span> {planet.climate}</p>
                        <p><span className="font-semibold text-white">Terrain:</span> {planet.terrain}</p>
                        <p><span className="font-semibold text-white">Population:</span> {planet.population}</p>
                        <p><span className="font-semibold text-white">Diameter:</span> {planet.diameter} km</p>
                        <p><span className="font-semibold text-white">Orbital Period:</span> {planet.orbital_period} days</p>
                        <p><span className="font-semibold text-white">Rotation Period:</span> {planet.rotation_period} hours</p>
                        <p><span className="font-semibold text-white">Gravity:</span> {planet.gravity}</p>
                        <p><span className="font-semibold text-white">Surface Water:</span> {planet.surface_water}%</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-10 items-center text-yellow-400 text-lg p-8">
                <button
                    onClick={() => navigate(`/planets/${planetId - 1}`)}
                    disabled={planetId <= 1}
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ← Previous
                </button>

                <button
                    onClick={() => navigate(`/planets/${planetId + 1}`)}
                    disabled={planetId >= maxId}
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next →
                </button>
            </div>
        </div>
    );
}
