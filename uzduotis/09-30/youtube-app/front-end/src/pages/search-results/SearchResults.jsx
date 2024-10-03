import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '../../components/grid/Grid';

const SearchResults = () => {
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const location = useLocation(); // To access the query parameters
  const query = new URLSearchParams(location.search).get('q'); // Get the query from URL

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`http://localhost:3000/api/video`);
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();

        // Filter the videos based on the query
        const lowercasedQuery = query?.toLowerCase() || ''; // Ensure query isn't null
        const filtered = data.filter(video =>
          video.title.toLowerCase().includes(lowercasedQuery) ||
          video.description.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredResults(filtered);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError('An error occurred while fetching videos. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchVideos(); // Fetch and filter videos when query is present
    }
  }, [query, location.search]); // Ensure useEffect re-runs if location.search changes

  return (
    <div className="container mt-4">
      <h3>Search Results for "{query}"</h3>

      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      {loading && <p>Loading results...</p>}

      {!loading && filteredResults.length === 0 && query && (
        <p>No results found for "{query}".</p>
      )}

      {!loading && filteredResults.length > 0 && (
        <Grid data={filteredResults} />
      )}
    </div>
  );
};

export default SearchResults;
