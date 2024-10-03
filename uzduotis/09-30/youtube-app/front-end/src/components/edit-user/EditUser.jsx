import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
  const { id } = useParams(); // Get user ID from the route params
  const [user, setUser] = useState({ name: '', email: '' }); // Provide default values to avoid undefined state
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/user/${id}`)
      .then((resp) => {
        setUser(resp.data || { name: '', email: '' }); // Ensure there's always an object
      })
      .catch((err) => {
        console.error('Error fetching user:', err);
        setMessage('Failed to load user data');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/api/user/${id}`, user)
      .then((resp) => {
        setMessage('User successfully updated');
        setTimeout(() => {
          navigate('/admin'); 
        }, 2000);
      })
      .catch((err) => {
        console.error('Error updating user:', err);
        setMessage('Failed to update user');
      });
  };

  return (
    <div className="container">
      <h3>Edit User</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={user.name || ''} // Ensure the input always has a value
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={user.email || ''} // Ensure the input always has a value
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

export default EditUser;
