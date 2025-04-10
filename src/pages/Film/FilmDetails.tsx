import { useParams, Link, useNavigate } from 'react-router-dom';
import { Film } from '../../types/api';
import { useCachedFetch } from '../../hooks/useCachedFetch';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { Calendar, User, Users, Film as FilmIcon } from 'lucide-react';

const filmPosters = {
  "4": "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/81A736C2B6CC7B7B4A3F2E2381E36542715DFC550F765F49BC0770898DE5F32B/scale?width=1200&aspectRatio=1.78&format=webp",
  "5": "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/B92552B7CE9B7BB39BB3BDC551F35DB98C04740118F5B30975134814DF7A4E62/scale?width=1200&aspectRatio=1.78&format=webp",
  "6": "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/773B031A52B5727F7C218E42149B45095C21A8BA56601EB1F51FC46485304210/scale?width=1200&aspectRatio=1.78&format=webp",
  "1": "https://disney.images.edge.bamgrid.com/ripcut-delivery/v1/variant/disney/91859b25-5ac0-411a-be2b-443434682a48?/scale?width=1200&aspectRatio=1.78&format=webp",
  "2": "https://disney.images.edge.bamgrid.com/ripcut-delivery/v1/variant/disney/5ba7e619-d209-4cf3-81f5-fabe9b94f3d4?/scale?width=1200&aspectRatio=1.78&format=webp",
  "3": "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/B38E9B3419A8AF5BA743C323CF835E7864A0406C310697CC34A072DE7E940FAD/scale?width=1200&aspectRatio=1.78&format=webp",
};

export default function FilmDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const filmId = Number(id);
  
  const {
    data: film,
    isLoading,
    error,
    refetch
  } = useCachedFetch<Film>(`https://swapi.dev/api/films/${id}/`);

  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (isLoading || !film) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/films"
        className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-6"
      >
        ← Back to Films
      </Link>

      <div className="bg-[#1A1F2E] rounded-lg overflow-hidden">
        <div
          className="w-full h-[500px] bg-cover bg-center"
          style={{
            backgroundImage: `url(${filmPosters[String(film.episode_id) as keyof typeof filmPosters]})`,
          }}
        />

        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <FilmIcon className="w-12 h-12 text-yellow-400" />
            <div>
              <h1 className="text-4xl font-bold text-yellow-400">{film.title}</h1>
              <p className="text-gray-400">Episode {film.episode_id}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-400">Director</p>
                <p className="text-white">{film.director}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-400">Producer</p>
                <p className="text-white">{film.producer}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-400">Release Date</p>
                <p className="text-white">
                  {new Date(film.release_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#0B0E18] rounded-lg p-6">
            <h2 className="text-xl font-bold text-yellow-400 mb-4">Opening Crawl</h2>
            <p className="text-gray-300 whitespace-pre-line leading-relaxed">
              {film.opening_crawl}
            </p>
          </div>
        </div>
      </div>

      {/* --- Navigation Buttons --- */}
      <div className="flex justify-center gap-10 items-center text-yellow-400 text-lg p-8">
        <button
          onClick={() => navigate(`/films/${filmId - 1}`)}
          disabled={filmId <= 1}
          className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <button
          onClick={() => navigate(`/films/${filmId + 1}`)}
          disabled={filmId >= 6}
          className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
