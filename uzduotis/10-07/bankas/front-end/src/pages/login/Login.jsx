import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  // onLogin will be passed from the parent component
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        onLogin(true); // Update the logged-in status in Heading component
        navigate("/"); // Redirect to home
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            setError(
              "Invalid credentials. Please check your email and password."
            );
            break;
          case 400:
            setError("Missing email or password.");
            break;
          default:
            setError("An error occurred during login. Please try again later.");
            break;
        }
      } else {
        setError("Unable to reach server. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 text-center" style={{ width: 500 }}>
      <h1 className="mb-5">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
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
          />
        </div>
        <button type="submit" className="btn btn-secondary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
