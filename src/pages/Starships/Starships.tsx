import { Link } from 'react-router-dom';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { Starship } from '../../types/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { ENDPOINTS } from '../../config/api';
import { Ship } from 'lucide-react';


export default function Starships() {
    const {
        data: starships,
        isLoading,
        error,
        ref,
        reset,
        hasMore
    } = useInfiniteScroll<Starship>(ENDPOINTS.starships, 'starships');

    if (error) return <ErrorMessage message={error} onRetry={reset} />;
    if (!starships.length && isLoading) return <LoadingSpinner />;

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex items-center gap-4 mb-10">
                <Ship className="w-12 h-12 text-yellow-400" />
                <div>
                    <h1 className="text-4xl font-bold text-yellow-400">Starships</h1>
                    <p className="text-gray-400">Explore the galaxy’s most starships</p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {starships.map((ship: Starship, index: number) => {
                    const id = ship.url.split('/').filter(Boolean).pop();
                    return (
                        <Link
                            key={ship.name + index}
                            to={`/starships/${id}`}
                            className="bg-zinc-900/80 p-6 rounded-3xl border border-zinc-700 shadow-xl hover:scale-[1.01] transition"
                        >
                            <h2 className="text-xl font-bold text-yellow-400 mb-2">{ship.name}</h2>
                            <p className="text-gray-300 text-sm">Model: {ship.model}</p>
                            <p className="text-gray-500 text-sm">Class: {ship.starship_class}</p>
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
