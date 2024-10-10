import React, { useState, useEffect } from 'react';
import { useRoutes, Link } from 'react-router-dom';
import Locations from './pages/Locations';
import LocationEvents from './pages/LocationEvents';
import Events from './pages/Events';
import './App.css';
import LocationsAPI from './services/LocationsAPI';

const App = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await LocationsAPI.getAllLocations();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

   const routes = [
      {
        path: '/',
        element: <Locations />
      },
      {
        path: '/echolounge',
        element: <LocationEvents id={1} name="The Echo Lounge & Music Hall" />
      },
      {
        path: '/houseofblues',
        element: <LocationEvents id={2} name="House of Blues" />
      },
      {
        path: '/pavilion',
        element: <LocationEvents id={3} name="The Pavilion at Toyota Music Factory" />
      },
      {
        path: '/americanairlines',
        element: <LocationEvents id={4} name="American Airlines Center" />
      },
      {
        path: '/events',
        element: <Events />
      }
    ]

  let element = useRoutes(routes);
  return (
    <div className='app'>
      <header className='main-header'>
        <h1>EventSphere</h1>

        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
          <Link to='/events' role='button'>Events</Link>
        </div>
      </header>

      <main>
        {loading ? <div>Loading...</div> : element}
      </main>
    </div>
  );
};

export default App;
