import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../utils/config';
import { formatDate } from '../../utils/common';
import axios from 'axios';

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState();

  useEffect(() => {
    // Fetch the video details
    axios.get(BASE_URL + '/api/video/' + id)
      .then(resp => {
        setVideo(resp.data);
      })
      .catch(error => console.error('Error fetching video data:', error));
  }, [id]);

  if (!video) {
    return <div>Loading...</div>;
  }

  const url = `https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&enablejsapi=1`;

  return (
    <div className='container' style={{ textAlign: 'center', marginTop: '20px' }}>
      <iframe 
        className='rounded-3'
        width="100%" 
        height="650" 
        src={url} 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen
        style={{ border: 'none' }}  
      ></iframe>
      <div className="container d-flex flex-column justify-content-start">
        <h3 className='text-start py-2'>{video.title}</h3>
      </div>
      <div className="p-3 bg-secondary-subtle rounded-3">
        <div className="d-flex gap-2 p-1">
          {/* Ensure that video.user exists before accessing userThumbnail */}
          {video.user && (
            <>
              <img src={video.user.userThumbnail} alt="User Thumbnail"/>
              <strong>{video.user.name}</strong>
            </>
          )}
          <strong>{video.views} views</strong>
          <strong>{formatDate(video.createdAt)}</strong>
        </div>
        <div className='text-start'>{video.description}</div>
      </div>
    </div>
  );
};

export default VideoPlayer;
