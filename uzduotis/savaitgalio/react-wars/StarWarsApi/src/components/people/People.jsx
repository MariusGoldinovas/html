import { useEffect, useState } from "react";
import './People.css';

const People = ({ films, selectedFilmId }) => {
  const [people, setPeople] = useState([]); // People state
  const selectedFilm = films.find(film => film.episode_id === selectedFilmId);

  // Fetch people when the selected film changes
  useEffect(() => {
    if (selectedFilm) {
      const fetchPeople = async () => {
        const peoplePromises = selectedFilm.characters.map(url => fetch(url).then(res => res.json()));
        const peopleData = await Promise.all(peoplePromises);
        setPeople(peopleData); // Set people data
      };

      fetchPeople();
    }
  }, [selectedFilm]); // Trigger useEffect when selectedFilm changes

  return (
    <>
      <div className="row">
        <div className="col title-people">
          {selectedFilm ? `People in ${selectedFilm.title}` : 'Select a film to show people'}
        </div>
            {people.map((person, index) => (
              <div className="row" key={person.name}>
                <div className="col-1">{index + 1}.</div>
                <div className="col-5">{person.name}</div>
                <div className="col">{person.birth_year}</div>
                <div className="col">{person.gender}</div>
                <div className="col">{person.mass} kg</div>
              </div>
            ))}
      </div>
    </>
  );
};

export default People;
