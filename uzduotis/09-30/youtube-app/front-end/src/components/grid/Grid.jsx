import { Link } from 'react-router-dom';
import { formatTimeAgo } from '../../utils/common';
import axios from 'axios';

const Grid = ({ data }) => {
  const incrementViews = async (videoId) => {
    try {
      await axios.put(`http://localhost:3000/api/video/increment-views/${videoId}`);
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  const sortedData = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="row row-cols-4 text-center mt-5 p-3 mx-3">
      {sortedData.map((video, index) => (
        <div key={index} className="col-3">
          <Link
            to={`/video-player/${video._id}`}
            onClick={() => incrementViews(video._id)}
          >
            <div className="thumbnail">
              <img
                style={{ height: 260 }}
                src={`http://localhost:3000/photos/${video.thumbnail}`}
                alt={`${video.title} thumbnail`}
              />
            </div>
            <div className="video-info d-flex flex-column justify-content-evenly">
              <h3>
                {video.title.length > 85 ? `${video.title.slice(0, 85)}...` : video.title}
              </h3>
              <p>
                {video.description.length > 200
                  ? `${video.description.slice(0, 200)}...`
                  : video.description}
              </p>
            </div>
          </Link>

          <div className="d-flex justify-content-between">
            {video.user && (
              <Link to={`/channel/${video.user._id}`}>
                <div className="user-img">
                  {video.user?.name}
                  <img
                    style={{ width: 40, height: 40, borderRadius: '50%' }}
                    src={`http://localhost:3000/photos/${video.thumbnail}`}
                    alt={`${video.user?.name}'s thumbnail`}
                  />
                </div>
              </Link>
            )}
            <div className="d-flex flex-column">
              <span>Views: {video.views}</span>
              <span>{formatTimeAgo(video.createdAt)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Grid;
