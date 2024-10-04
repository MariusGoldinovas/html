import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL, IMAGES_URL } from '../../utils/config';

import './Channel.css';
import axios from 'axios';

const Channel = () => {
    const [data, setData] = useState();
    const [videoData, setVideoData] = useState([]);
    const { id } = useParams();  

    // Fetch user data
    useEffect(() => {
        axios.get(BASE_URL + '/api/user/' + id)
            .then(resp => setData(resp.data))
            .catch(error => console.error('Error fetching user data:', error));
    }, [id]);

    // Fetch all videos of the user
    useEffect(() => {
        axios.get(BASE_URL + '/api/video/user/' + id)
            .then(resp => setVideoData(resp.data))
            .catch(error => console.error('Error fetching videos:', error));
    }, [id]);

    return data && (
        <div className="container">
            <h1>Channel of {data.name}</h1>
            <img className='cover-photo' src={IMAGES_URL + data.coverPhoto} alt="Cover" />
            <div className="video-list">
                <h3 className='mt-3'>Your videos:</h3>
                <div className="row">
                    {videoData.map(video => (
                        <div key={video._id} className="col-3">
                            <Link to={`/video-player/${video._id}`}>
                                <div className="thumbnail">
                                    <img
                                        style={{ height: 260 }}
                                        src={`${IMAGES_URL}${video.thumbnail}`}
                                        alt={video.title}
                                    />
                                </div>
                                <div className="video-info">
                                    <h3>{ video.title}</h3>
                                    <div className="footer d-flex justify-content-between pt-3">
                                        <span>Views: {video.views}</span>
                                        <span>Created:  {new Date(video.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Channel;
