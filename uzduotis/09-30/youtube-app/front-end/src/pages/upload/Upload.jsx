import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { extractFormData } from "../../utils/common.js";
import axios from 'axios';

const Upload = () => {
    const [message, setMessage] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        data.append('user', '66fe8a7d59b55a220e135698');

        axios.post('http://localhost:3000/api/video/', data)
            .then(resp => {
                setMessage({
                    data: resp.data.message,
                    status: 'success'
                });
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            })
            .catch(err => setMessage({
                data: err.response.data,
                status: 'danger'
            }));
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
                        placeholder="Add thumbnail"
                        className="form-control"
                        id="thumbnail"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="videoId"
                        placeholder="Enter video id"
                        className="form-control"
                    />
                </div>
                <button className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Upload;
