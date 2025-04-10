import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  Rocket,
  Users,
  Car,
  Earth as Planet,
  Ghost as Alien,
  Film,
  Home,
} from 'lucide-react';

const navItems = [
  { path: '/films', label: 'Films', icon: Film },
  { path: '/people', label: 'People', icon: Users },
  { path: '/starships', label: 'Starships', icon: Rocket },
  { path: '/vehicles', label: 'Vehicles', icon: Car },
  { path: '/species', label: 'Species', icon: Alien },
  { path: '/planets', label: 'Planets', icon: Planet },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#0B0E18] text-white">
      {/* Fixed Sidebar */}
      <nav className="w-20 bg-[#1A1F2E] flex flex-col items-center justify-between py-8">
        {/* Top Icons */}
        <div className="flex flex-col items-center space-y-8">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`p-3 rounded-lg transition-all duration-300 hover:bg-[#2A304A] ${
                location.pathname.startsWith(path) ? 'bg-[#2A304A] text-yellow-400' : ''
              }`}
              title={label}
            >
              <Icon size={24} />
            </Link>
          ))}
        </div>

        {/* Home Icon at Bottom */}
        <Link
          to="/"
          className={`p-3 rounded-lg transition-all duration-300 hover:bg-[#2A304A] ${
            location.pathname === '/' ? 'bg-[#2A304A] text-yellow-400' : ''
          }`}
          title="Home"
        >
          <Home size={24} />
        </Link>
      </nav>

      {/* Scrollable Page Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
