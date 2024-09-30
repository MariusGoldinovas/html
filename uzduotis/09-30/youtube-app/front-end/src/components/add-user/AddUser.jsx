import { useState } from "react";

const AddUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    userThumbnail: "",
    coverPhoto: "",
    description: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlEncodedData = new URLSearchParams(formData).toString();

    // Send data to backend
    fetch('http://localhost:3000/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlEncodedData,
    })
      .then((resp) => resp.json())
      .then((resp) => console.log(resp))
      .catch((error) => console.error('Error:', error));

    e.target.reset(); // Reset form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-5 text-center" style={{ width: 500 }}>
      <h1 className="mb-5">Add New User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="mb-2">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            maxLength="100"
            name="username"
            value={formData.username} 
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="mb-2">
            User Email
          </label>
          <input
            type="email"
            className="form-control"
            maxLength="100"
            name="email"
            value={formData.email} 
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userThumbnail" className="mb-2">
            User Image
          </label>
          <input
            type="text"
            className="form-control"
            name="userThumbnail"
            value={formData.userThumbnail} 
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="coverPhoto" className="mb-2">
            User Cover Image
          </label>
          <input
            type="text"
            className="form-control"
            name="coverPhoto"
            value={formData.coverPhoto} 
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="mb-2">
            User Description
          </label>
          <input
            type="text"
            className="form-control"
            maxLength="200"
            name="description"
            value={formData.description} 
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="mb-2">
            User Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password} 
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
