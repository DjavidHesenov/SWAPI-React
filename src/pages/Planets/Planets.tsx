import { Link } from 'react-router-dom';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { Planet } from '../../types/api'; // ✅ correct import here
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { ENDPOINTS, ResourceType } from '../../config/api';
import { Globe } from 'lucide-react';

export default function Planets() {
    const {
        data: planets,
        isLoading,
        error,
        ref,
        reset,
        hasMore
    } = useInfiniteScroll<Planet>(ENDPOINTS.planets, 'planets' as ResourceType);

    if (error) return <ErrorMessage message={error} onRetry={reset} />;
    if (!planets.length && isLoading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen text-white px-6 py-12">
            <div className="flex items-center gap-4 mb-10">
                <Globe className="w-12 h-12 text-yellow-400" />
                <div>
                    <h1 className="text-4xl font-bold text-yellow-400">Planets</h1>
                    <p className="text-gray-400">Explore the galaxy’s many worlds</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {planets.map((planet: Planet, index: number) => {
                    const id = planet.url.split('/').filter(Boolean).pop();

                    return (
                        <Link
                            key={planet.name + index}
                            to={`/planets/${id}`}
                            className="bg-zinc-900/80 rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-transform"
                        >
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-yellow-300 mb-2">{planet.name}</h2>
                                <p className="text-sm text-gray-400">Climate: {planet.climate}</p>
                                <p className="text-sm text-gray-400">Terrain: {planet.terrain}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div ref={ref} className="py-10 flex justify-center">
                {isLoading && hasMore && <LoadingSpinner />}
            </div>
        </div>
    );
}
