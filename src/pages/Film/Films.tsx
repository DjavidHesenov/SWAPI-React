import { ENDPOINTS } from '../../config/api';
import { Film } from '../../types/api';
import ResourceCard from '../../components/ResourceCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { Film as FilmIcon } from 'lucide-react';
import { useCachedFetch } from '../../hooks/useCachedFetch';

export default function Films() {
  const { data: films, isLoading, error, refetch } = useCachedFetch<Film[]>(ENDPOINTS.films);

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <FilmIcon className="w-12 h-12 text-yellow-400" />
        <div>
          <h1 className="text-4xl font-bold text-yellow-400">Star Wars Films</h1>
          <p className="text-gray-400">Explore the epic saga</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(films ?? []).map((film: Film) => (
          <div key={film.url}>
            <ResourceCard
              title={film.title}
              subtitle={`Episode ${film.episode_id}`}
              details={[
                { label: 'Director', value: film.director },
                { label: 'Release Date', value: new Date(film.release_date).toLocaleDateString() },
                { label: 'Producer', value: film.producer },
              ]}
              to={`/films/${film.url.split('/').filter(Boolean).pop()}`}
            />
          </div>
        ))}
      </div>

      {isLoading && <LoadingSpinner />}
    </div>
  );
}
