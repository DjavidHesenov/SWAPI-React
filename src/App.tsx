import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Films from './pages/Film/Films';
import FilmDetails from './pages/Film/FilmDetails';
import { DataProvider } from './context/DataContext';
import People from './pages/People/People';
import PeopleDetails from './pages/People/PeopleDetails';
import Starships from './pages/Starships/Starships';
import StarshipDetails from './pages/Starships/StarshipsDetails';
import Vehicles from './pages/Vehicles/Vehicles';
import VehicleDetails from './pages/Vehicles/VehicleDetails';
import Species from './pages/Species/Species';
import SpecieDetails from './pages/Species/SpecieDetails';
import Planets from './pages/Planets/Planets';
import PlanetDetails from './pages/Planets/PlanetDetails';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          {/* Main layout wrapper */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/films" element={<Films />} />
            <Route path="/films/:id" element={<FilmDetails />} />
            <Route path="/people" element={<People />} />
            <Route path="/people/:id" element={<PeopleDetails />} />
            <Route path="/starships" element={<Starships />} />
            <Route path="/starships/:id" element={<StarshipDetails />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/vehicles/:id" element={<VehicleDetails />} />
            <Route path="/species" element={<Species />} />
            <Route path="/species/:id" element={<SpecieDetails />} />
            <Route path="/planets" element={<Planets />} />
            <Route path="/planets/:id" element={<PlanetDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
