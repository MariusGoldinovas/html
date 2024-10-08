import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); // useNavigate hook for navigation
  const view = "users"; // Assuming view is set to 'users' since this is the Users component

  // Function to fetch users
  const fetchUsers = () => {
    axios
      .get("http://localhost:3000/api/user/")
      .then((resp) => {
        // Sort data by name alphabetically (case-insensitive)
        const sortedData = resp.data.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );
        setData(sortedData); // Save sorted data to state
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setMessage({
          data: "Failed to load users",
          status: "danger",
        });
      });
  };

  // Function to handle user editing
  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`); // Navigate to the edit page for the selected user
  };

  // Function to handle user removal
  const handleRemove = (id) => {
    const url = `http://localhost:3000/api/user/${id}`; // URL to delete the user

    axios
      .delete(url)
      .then((resp) => {
        setMessage({
          data: resp.data.message,
          status: "success",
        });
        fetchUsers(); // Re-fetch the users after deletion
      })
      .catch((err) => {
        setMessage({
          data: err.response?.data?.error || "An error occurred",
          status: "danger",
        });
      });
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Users List</h1>
      {message && (
        <div className={`alert alert-${message.status}`}>{message.data}</div>
      )}

      {data.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleEdit(user._id)}
                    className="btn btn-link text-primary me-3"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    onClick={() => handleRemove(user._id)}
                    className="btn btn-link text-danger"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
};

export default Users;
