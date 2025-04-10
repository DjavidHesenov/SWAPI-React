import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

export default function Home() {
  return (
    <div
      className="min-h-[100vh] flex flex-col items-center justify-center text-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
      }}
    >
      <div className="bg-black bg-opacity-70 p-12 rounded-lg max-w-3xl">
        <Rocket className="w-20 h-20 mx-auto mb-8 text-yellow-400" />
        <h1 className="text-5xl font-bold mb-6 text-yellow-400">
          Explore the Star Wars Universe
        </h1>
        <p className="text-xl mb-8 text-gray-300">
          Embark on an epic journey through a galaxy far, far away. Discover legendary characters,
          iconic starships, diverse species, and fascinating planets that make up the rich tapestry
          of the Star Wars saga.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            to="/films"
            className="bg-[#1A1F2E] p-4 rounded-lg hover:bg-[#2A304A] transition-all duration-300"
          >
            <h3 className="text-lg font-bold text-yellow-400">Films</h3>
            <p className="text-sm text-gray-400">Explore the epic saga</p>
          </Link>
          <Link
            to="/people"
            className="bg-[#1A1F2E] p-4 rounded-lg hover:bg-[#2A304A] transition-all duration-300"
          >
            <h3 className="text-lg font-bold text-yellow-400">Characters</h3>
            <p className="text-sm text-gray-400">Meet the legends</p>
          </Link>
          <Link
            to="/starships"
            className="bg-[#1A1F2E] p-4 rounded-lg hover:bg-[#2A304A] transition-all duration-300"
          >
            <h3 className="text-lg font-bold text-yellow-400">Starships</h3>
            <p className="text-sm text-gray-400">Tour the fleet</p>
          </Link>
          <Link
            to="/vehicles"
            className="bg-[#1A1F2E] p-4 rounded-lg hover:bg-[#2A304A] transition-all duration-300"
          >
            <h3 className="text-lg font-bold text-yellow-400">Vehicles</h3>
            <p className="text-sm text-gray-400">Navigate iconic transports</p>
          </Link>
          <Link
            to="/species"
            className="bg-[#1A1F2E] p-4 rounded-lg hover:bg-[#2A304A] transition-all duration-300"
          >
            <h3 className="text-lg font-bold text-yellow-400">Species</h3>
            <p className="text-sm text-gray-400">Discover galactic lifeforms</p>
          </Link>
          <Link
            to="/planets"
            className="bg-[#1A1F2E] p-4 rounded-lg hover:bg-[#2A304A] transition-all duration-300"
          >
            <h3 className="text-lg font-bold text-yellow-400">Planets</h3>
            <p className="text-sm text-gray-400">Visit distant worlds</p>
          </Link>
        </div>
      </div>
    </div>
  );
}