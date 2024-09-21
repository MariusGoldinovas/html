import { useEffect, useState } from "react";
import Films from './components/films/Films';
import People from './components/people/People';
import './App.css';

function App() {
  const [films, setFilms] = useState([]); // Films data state
  const [selectedFilmId, setSelectedFilmId] = useState(null); // Selected film ID state

  useEffect(() => {
    fetch('https://swapi.dev/api/films/')
      .then(response => response.json())
      .then(data => {
        setFilms(data.results); // Fetch films data and set it in the state
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Function to handle the selected film ID from Films component
  const handlePeople = (filmId) => {
    setSelectedFilmId(filmId); // Set the selected film ID
  };

  console.log(selectedFilmId); // Log the selected film ID for debugging

  return (
    <div className="container">
      <div className="nav">
        <ul>
          <li>About</li>
          <li>Films</li>
        </ul>
      </div>
      <div className="content-area">
        <div className="film-card">
          {/* Pass films and the handler function to Films */}
          <Films films={films} onShowPeople={handlePeople} />
        </div>
        <div className="people">
          {/* Pass films and the selectedFilmId to People */}
          <People films={films} selectedFilmId={selectedFilmId} />
        </div>
      </div>
    </div>
  );
}

export default App;
