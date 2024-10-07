import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
import axios from 'axios';

const Upload = () => {
    const [message, setMessage] = useState(null);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(BASE_URL + '/api/category/', { withCredentials: true })  // Enable credentials
            .then(resp => setCategories(resp.data))
            .catch(err => {
                setMessage({
                    data: 'Error fetching categories.',
                    status: 'danger'
                });
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create FormData from form submission
        const data = new FormData(e.target);

        axios.post(BASE_URL + '/api/video/', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true  // Enable credentials (cookies will be sent)
        })
        .then(resp => {
            setMessage({
                data: resp.data.message,
                status: 'success'
            });
            setTimeout(() => {
                navigate('/');
            }, 3000);  // Redirect after 3 seconds
        })
        .catch(err => {
            console.error('Error uploading video:', err);  // Log the error for debugging
            setMessage({
                data: err.response?.data?.message || 'An error occurred. Please try again.',
                status: 'danger'
            });
        });
    };

    return (
        <div className="container">
            <h1>New Video</h1>
            {message && (
                <div className={`alert alert-${message.status}`}>
                    {message.data}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter video title"
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        name="description"
                        placeholder="Enter video description"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="thumbnail">Add video thumbnail</label>
                    <input
                        type="file"
                        name="thumbnail"
                        className="form-control"
                        id="thumbnail"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="videoId"
                        placeholder="Enter video id"
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <select 
                        name="category"
                        className="form-control"
                        required
                    >
                        {categories.length > 0 ? (
                            categories.map(el => (
                                <option key={el._id} value={el._id}>
                                    {el.name}
                                </option>
                            ))
                        ) : (
                            <option disabled>No categories available</option>
                        )}
                    </select>
                </div>
                <button className="btn btn-primary" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Upload;
