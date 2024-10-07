import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddUser = () => {
    const [message, setMessage] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const data = new FormData(e.target);  // Collect all form data, including files
    
        axios.post('http://localhost:3000/api/user/', data)
        .then(resp => {
            setMessage({
                data: resp.data.message,
                status: 'success'
            });
            setTimeout(() => {
                navigate('/');
            }, 3000);
        })
        .catch(err => {
            const errorMessage = err.response?.data?.error || 'An error occurred';
            setMessage({
                data: errorMessage,
                status: 'danger'
            });
        });
    }

    return (
        <div className="container">
            <h1>New User</h1>
            {message && 
                <div className={'alert alert-' + message.status}>
                    {message.data}
                </div>
            }
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input 
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input 
                        name="email"
                        placeholder="Enter your email"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="">Upload your thumbnail file</label>
                    <input 
                        type="file"
                        name="userThumbnail"  
                        placeholder="Upload your thumbnail file"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="">Upload cover image file</label>
                    <input 
                        type="file"
                        name="coverPhoto"  
                        placeholder="Upload cover image file"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <textarea 
                        name="description"
                        placeholder="Enter your description"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text"
                        name="password"
                        placeholder="Enter password"
                        className="form-control"
                    />
                </div>
                <button
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </form>
        </div>

    );
}

export default AddUser;