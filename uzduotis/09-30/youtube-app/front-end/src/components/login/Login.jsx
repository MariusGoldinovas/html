import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Correct way to encode form data
    const urlEncodedData = new URLSearchParams({
      email: email,
      password: password
    }).toString();

    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodedData,
      });

      // Check if there is content to be parsed as JSON
      const result = response.headers.get('Content-Type')?.includes('application/json')
        ? await response.json()
        : {};

      if (response.ok) {
        navigate('/home');
      } else {
        setError(result.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred during login. Please try again.');
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
                />
            </div>
            <div className="mb-3">
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
        <button type="submit" className="btn btn-secondary">Login</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
