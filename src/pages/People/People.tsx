import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { Person } from '../../types/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { ENDPOINTS } from '../../config/api';

export default function People() {
  const {
    data: people,
    isLoading,
    error,
    ref,
    reset,
    hasMore,
  } = useInfiniteScroll<Person>(ENDPOINTS.people, 'people');

  if (error) return <ErrorMessage message={error} onRetry={reset} />;
      if (!people.length && isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-8 py-10">
      <div className="flex items-center gap-4 mb-10">
        <Users className="w-12 h-12 text-yellow-400" />
        <div>
          <h1 className="text-4xl font-bold text-yellow-400">Characters</h1>
          <p className="text-gray-400">Explore the galaxy’s most legendary people</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {people.map((person: Person) => {
          const id = person.url.split('/').filter(Boolean).pop();
          return (
            <Link
              key={person.url}
              to={`/people/${id}`}
              className="bg-zinc-900 rounded-2xl p-4 shadow-lg hover:scale-105 transition"
            >
              <img
                src={`https://robohash.org/${person.name}?set=set2&size=180x180`}
                alt={person.name}
                className="rounded-xl w-full h-40 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold text-yellow-400">{person.name}</h2>
              <p className="text-sm text-gray-400">Birth Year: {person.birth_year}</p>
              <div className="text-sm text-gray-500 mt-2">
                <p>Gender: {person.gender}</p>
                <p>Height: {person.height} cm</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Loading indicator at the bottom for infinite scroll */}
      {isLoading && (
        <div className="flex justify-center mt-10">
          <LoadingSpinner />
        </div>
      )}

      {/* 👇 Intersection observer target element */}
      {hasMore && (
        <div ref={ref} className="h-10 mt-10" />
      )}
    </div>
  );
}
