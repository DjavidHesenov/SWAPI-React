import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCachedFetch } from '../../hooks/useCachedFetch';
import { Vehicle } from '../../types/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

export default function VehicleDetails() {
    const { id } = useParams<{ id: string }>();
    const { data: vehicle, isLoading, error, refetch } = useCachedFetch<Vehicle>(`https://swapi.dev/api/vehicles/${id}/`);
    const navigate = useNavigate();
    const vehicleId = Number(id);

    if (isLoading || !vehicle) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} onRetry={refetch} />;

    const imageUrl = `https://robohash.org/${vehicle.name}?set=set4&size=300x300`;

    return (
        <div className="container mx-auto px-6 py-12 text-white">
            <Link to="/vehicles" className="text-yellow-400 hover:underline mb-6 inline-block">
                ← Back to Vehicles
            </Link>

            <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700 rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row gap-10 items-center">
                <img
                    src={imageUrl}
                    alt={vehicle.name}
                    className="rounded-2xl w-72 h-72 object-cover border-4 border-yellow-500 shadow-lg"
                    onError={(e) => (e.currentTarget.src = '/placeholder-vehicle.png')}
                />
                <div className="text-gray-200 w-full">
                    <h1 className="text-5xl font-extrabold text-yellow-400 mb-8">{vehicle.name}</h1>
                    <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-[16px]">
                        <p><span className="font-semibold text-white">Model:</span> {vehicle.model}</p>
                        <p><span className="font-semibold text-white">Class:</span> {vehicle.vehicle_class}</p>
                        <p><span className="font-semibold text-white">Manufacturer:</span> {vehicle.manufacturer}</p>
                        <p><span className="font-semibold text-white">Cost:</span> {vehicle.cost_in_credits} credits</p>
                        <p><span className="font-semibold text-white">Length:</span> {vehicle.length} m</p>
                        <p><span className="font-semibold text-white">Speed:</span> {vehicle.max_atmosphering_speed}</p>
                        <p><span className="font-semibold text-white">Crew:</span> {vehicle.crew}</p>
                        <p><span className="font-semibold text-white">Passengers:</span> {vehicle.passengers}</p>
                        <p><span className="font-semibold text-white">Cargo Capacity:</span> {vehicle.cargo_capacity}</p>
                        <p><span className="font-semibold text-white">Consumables:</span> {vehicle.consumables}</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center gap-10 items-center text-yellow-400 text-lg p-8">
                <button
                    onClick={() => navigate(`/vehicles/${vehicleId - 1}`)}
                    disabled={vehicleId <= 1}
                    className={`px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    ← Previous
                </button>

                <button
                    onClick={() => navigate(`/vehicles/${vehicleId + 1}`)}
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700"
                >
                    Next →
                </button>
            </div>
        </div>
    );
}
