import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search-results?q=${encodeURIComponent(query)}`); // Navigate to search results page with the query
    }
  };

  return (
    <form onSubmit={handleSearch} className="input-group ">
      <input
        type="text"
        className="form-control"
        placeholder="Search for videos"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
      />
      <button className="btn btn-outline-secondary" type="submit">
        <i className="bi bi-search"></i> Search
      </button>
    </form>
  );
};

export default Search;
