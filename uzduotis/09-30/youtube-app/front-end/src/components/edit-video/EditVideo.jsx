import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditVideo = () => {
  const { id } = useParams(); // Get video ID from the route params
  const [video, setVideo] = useState({ title: '', description: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/video/${id}`)
      .then((resp) => {
        setVideo(resp.data);
      })
      .catch((err) => {
        console.error('Error fetching video:', err);
        setMessage('Failed to load video data');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideo({ ...video, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/api/video/${id}`, video)
      .then((resp) => {
        setMessage('Video successfully updated');
        setTimeout(() => {
          navigate('/admin'); 
        }, 2000);
      })
      .catch((err) => {
        console.error('Error updating video:', err);
        setMessage('Failed to update video');
      });
  };

  return (
    <div className="container">
      <h3>Edit Video</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={video.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={video.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditVideo;
