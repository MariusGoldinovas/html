import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatTimeAgo } from '../../utils/common';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';

const Grid = ({ data }) => {
  const [sortOption, setSortOption] = useState('date');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/category/`)
      .then(resp => {
        setCategories(resp.data);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
      });
  }, []);

  // Handle sorting change
  const handleSortChange = (e) => {
    setSortOption(e.target.value); // Update the sorting option
  };

  // Filter videos by selected category if any
  const filteredData = selectedCategory
    ? data.filter(video => video.category === selectedCategory)
    : data;

  // Sort the filtered data based on selected option
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOption === 'views') {
      return b.views - a.views;
    } else if (sortOption === 'createdAt' || sortOption === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOption === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <>
      {/* Sort and filter options */}
      <div className="container-fluid d-flex justify-content-between my-4 px-5">
        <div className="d-flex gap-3 align-items-center">
          <label style={{ minWidth: 100 }}>Sort videos:</label>
          <select className="form-control" onChange={handleSortChange}>
            <option value="date">Date</option>
            <option value="views">View Count</option>
            <option value="title">Title</option>
          </select>
        </div>
        <div className="btn-group" role="group" aria-label="Category filter">
          <button
            className={`btn btn-outline-secondary ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              className={`btn btn-outline-secondary ${selectedCategory === category._id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category._id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Video grid, centered */}
      <div className="container-fluid px-5">
        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
          {sortedData.map((video, index) => (
            <div key={index} className="col-3">
              <Link to={`/video-player/${video._id}`}>
                <div className="thumbnail">
                  <img
                    style={{ width: '100%', height: 'auto', maxHeight: '260px', objectFit: 'cover' }}
                    src={`${BASE_URL}/photos/${video.thumbnail}`}
                    alt={`${video.title} thumbnail`}
                  />
                </div>

                <div className="video-info mt-2">
                  <h5>{video.title.length > 85 ? `${video.title.slice(0, 85)}...` : video.title}</h5>
                  <p>{video.description.length > 200 ? `${video.description.slice(0, 200)}...` : video.description}</p>
                </div>
              </Link>

              <div className="d-flex justify-content-between align-items-center mt-2">
                {video.user && (
                  <Link to={`/channel/${video.user._id}`} className="d-flex align-items-center">
                    <img
                      style={{ width: 40, height: 40, borderRadius: '50%' }}
                      src={video.user.userThumbnail ? `${BASE_URL}/photos/${video.user.userThumbnail}` : '/default-user-thumbnail.png'}
                      alt={`${video.user.name}'s thumbnail`}
                    />
                  </Link>
                )}
                <div className="text-right">
                  <span>Views: {video.views}</span>
                  <br />
                  <span>{formatTimeAgo(video.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Grid;
