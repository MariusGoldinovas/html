import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(null);
  const [view, setView] = useState('videos'); // Toggle between 'videos' and 'users'
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch videos
  const fetchVideos = () => {
    axios
      .get('http://localhost:3000/api/video/')
      .then((resp) => {
        const sortedData = resp.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by date
        setData(sortedData);
      })
      .catch((err) => {
        console.error('Error fetching videos:', err);
        setMessage({
          data: 'Failed to load videos',
          status: 'danger'
        });
      });
  };

  // Fetch users
  const fetchUsers = () => {
    axios
      .get('http://localhost:3000/api/user/')
      .then((resp) => {
        const sortedData = resp.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by date
        setData(sortedData);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setMessage({
          data: 'Failed to load users',
          status: 'danger'
        });
      });
  };

  useEffect(() => {
    if (view === 'videos') {
      fetchVideos();
    } else {
      fetchUsers();
    }
  }, [view]);

  const handleEdit = (id) => {
    if (view === 'videos') {
      navigate(`/edit-video/${id}`);
    } else {
      navigate(`/edit-user/${id}`);
    }
  };

  const handleRemove = (id) => {
    const url = view === 'videos' ? `http://localhost:3000/api/video/${id}` : `http://localhost:3000/api/user/${id}`;

    axios.delete(url)
      .then(resp => {
        setMessage({
          data: resp.data.message,
          status: 'success'
        });
        if (view === 'videos') {
          fetchVideos();
        } else {
          fetchUsers();
        }
      })
      .catch(err => {
        setMessage({
          data: err.response?.data?.error || 'An error occurred',
          status: 'danger'
        });
      });
  };

  return (
    <div className="container">
      <h3 className="my-4">{view === 'videos' ? 'Videos List' : 'Users List'}</h3>

      {message && (
        <div className={`alert alert-${message.status}`} role="alert">
          {message.data}
        </div>
      )}

      <div className="mb-3">
        <button
          className={`btn btn-${view === 'videos' ? 'primary' : 'secondary'} me-2`}
          onClick={() => setView('videos')}
        >
          View Videos
        </button>
        <button
          className={`btn btn-${view === 'users' ? 'primary' : 'secondary'}`}
          onClick={() => setView('users')}
        >
          View Users
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Thumbnail</th>
            {view === 'videos' ? (
              <>
                <th scope="col">Title</th>
                <th scope="col">Views</th>
              </>
            ) : (
              <>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
              </>
            )}
            <th scope="col">Created At</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>
                <img 
                  src={`http://localhost:3000/photos/${view === 'videos' ? item.thumbnail : item.userThumbnail}`} 
                  alt="Thumbnail"
                  width="50"
                  height="50"
                  style={{ objectFit: 'cover' }}
                />
              </td>
              {view === 'videos' ? (
                <>
                  <td>{item.title}</td>
                  <td>{item.views}</td>
                </>
              ) : (
                <>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                </>
              )}
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(item._id)} className="btn btn-link text-primary me-3">
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button onClick={() => handleRemove(item._id)} className="btn btn-link text-danger">
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
