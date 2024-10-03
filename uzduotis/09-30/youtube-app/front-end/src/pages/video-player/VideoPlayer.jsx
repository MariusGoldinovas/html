import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../utils/config';
import { formatDate } from '../../utils/common';
import axios from 'axios';

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    axios.get(BASE_URL + '/api/video/' + id)
      .then(resp => {
        setVideo(resp.data);
      });
  }, [id]);

  if (!video) {
    return <div>Loading...</div>;
  }

  const url = `https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&enablejsapi=1`;

  return (
    <div className='container' style={{ textAlign: 'center', marginTop: '20px' }}>
      <iframe 
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
        <h2> {video.title}</h2>
      </div>
      <div className="p-3 bg-secondary-subtle rounded-3">
                <div className="d-flex gap-2">
                    <strong>{video.views} views</strong>
                    <strong>{formatDate(video.createdAt)}</strong>
                </div>
                <div>
                    {video.description}
                </div>
            </div>
    </div>
  );
};

export default VideoPlayer;
