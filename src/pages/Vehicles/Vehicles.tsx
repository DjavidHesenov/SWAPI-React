import { Link } from 'react-router-dom';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { Vehicle } from '../../types/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { ENDPOINTS } from '../../config/api';
import { Car } from 'lucide-react';


export default function Vehicles() {
    const {
        data: vehicles,
        isLoading,
        error,
        ref,
        reset,
        hasMore
    } = useInfiniteScroll<Vehicle>(ENDPOINTS.vehicles, 'vehicles');

    if (error) return <ErrorMessage message={error} onRetry={reset} />;
    if (!vehicles.length && isLoading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen text-white px-6 py-12">
            <div className="flex items-center gap-4 mb-10">
                <Car className="w-12 h-12 text-yellow-400" />
                <div>
                    <h1 className="text-4xl font-bold text-yellow-400">Vehicles</h1>
                    <p className="text-gray-400">Explore the galaxy’s most vehicles</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {vehicles.map((vehicle: Vehicle, index: number) => {
                    const id = vehicle.url.split('/').filter(Boolean).pop();

                    return (
                        <Link
                            key={vehicle.name + index}
                            to={`/vehicles/${id}`}
                            className="bg-zinc-900/80 rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-transform"
                        >
                            <img
                                src={`https://robohash.org/${vehicle.name}?set=set4&size=300x300`}
                                alt={vehicle.name}
                                onError={(e) => (e.currentTarget.src = '/placeholder-vehicle.png')}
                                className="w-full h-56 object-cover object-center"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-yellow-300 mb-2">{vehicle.name}</h2>
                                <p className="text-sm text-gray-400">Model: {vehicle.model}</p>
                                <p className="text-sm text-gray-400">Class: {vehicle.vehicle_class}</p>
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
