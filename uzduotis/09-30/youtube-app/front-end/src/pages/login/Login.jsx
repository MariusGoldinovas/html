import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');  // Clear any previous errors

    try {
      const response = await axios.post(
        'http://localhost:3000/api/user/login', 
        { email, password }, 
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,  // Ensure the session cookie is sent with the request
        }
      );

      if (response.status === 200) {
        // If login is successful, redirect to the homepage
        navigate('/home');
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            setError('Invalid credentials. Please check your email and password.');
            break;
          case 400:
            setError('Missing email or password.');
            break;
          default:
            setError('An error occurred during login. Please try again later.');
            break;
        }
      } else {
        setError('Unable to reach server. Please check your connection.');
      }
    } finally {
      setLoading(false);  // Stop the loading state
    }
  };

  return (
    <div className="container mt-5 text-center" style={{ width: 500 }}>
      <h1 className='mb-5'>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
            disabled={loading}
          />
        </div>
        <button type="submit" className="btn btn-secondary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }} aria-live="assertive">{error}</p>}
    </div>
  );
};

export default Login;
