import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Users, Car, Earth as Planet, Ghost as Alien , Film } from 'lucide-react';

const navItems = [
  { path: '/films', label: 'Films', icon: Film },
  { path: '/people', label: 'People', icon: Users },
  { path: '/starships', label: 'Starships', icon: Rocket },
  { path: '/vehicles', label: 'Vehicles', icon: Car },
  { path: '/species', label: 'Species', icon: Alien },
  { path: '/planets', label: 'Planets', icon: Planet },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0B0E18] text-white">
      <nav className="fixed top-0 left-0 h-full w-20 bg-[#1A1F2E] flex flex-col items-center py-8 space-y-8">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`p-3 rounded-lg transition-all duration-300 hover:bg-[#2A304A] ${
              location.pathname === path ? 'bg-[#2A304A] text-yellow-400' : ''
            }`}
            title={label}
          >
            <Icon size={24} />
          </Link>
        ))}
      </nav>
      <main className="ml-20">
        {children}
      </main>
    </div>
  );
}