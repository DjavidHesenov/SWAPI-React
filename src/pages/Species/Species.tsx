import { Link } from 'react-router-dom';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { Species } from '../../types/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { ENDPOINTS } from '../../config/api';
import { PawPrint } from 'lucide-react';

export default function SpeciesList() {
    const {
        data: species,
        isLoading,
        error,
        ref,
        reset,
        hasMore
    } = useInfiniteScroll<Species>(ENDPOINTS.species, 'species');

    if (error) return <ErrorMessage message={error} onRetry={reset} />;
    if (!species.length && isLoading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen text-white px-6 py-12">
            <div className="flex items-center gap-4 mb-10">
                <PawPrint className="w-12 h-12 text-yellow-400" />
                <div>
                    <h1 className="text-4xl font-bold text-yellow-400">Species</h1>
                    <p className="text-gray-400">Discover the galaxy’s diverse species</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {species.map((specie: Species, index: number) => {
                    const id = specie.url.split('/').filter(Boolean).pop();

                    return (
                        <Link
                            key={specie.name + index}
                            to={`/species/${id}`}
                            className="bg-zinc-900/80 rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-transform"
                        >
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-yellow-300 mb-2">{specie.name}</h2>
                                <p className="text-sm text-gray-400">Classification: {specie.classification}</p>
                                <p className="text-sm text-gray-400">Language: {specie.language}</p>
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
