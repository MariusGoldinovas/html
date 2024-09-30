import { useState } from "react";
import "./Home.css";

const Home = ({ data }) => {
  const [visibleCount, setVisibleCount] = useState(20);

  const videosToDisplay = data.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 20);
  };

  return (
    <div className="row row-cols-4 text-center mt-5 p-3 mx-3">
      {videosToDisplay.map((video, index) => (
        <div key={index} className="col-3">
          <div className="thumbnail " >
            <img src={video.thumbnail} alt={video.title} />
          </div>
          <div className="video-info">
            <h3>{video.name}</h3>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
          </div>
        </div>
      ))}
      {visibleCount < data.length && (
        <button onClick={loadMore} className="load-more-btn">Load More</button>
      )}
    </div>
  );
};

export default Home;


    //     <div>
    //     <h1>Video List</h1>
    //     <ul>
    //       {data.map((video, index) => (
    //         <li key={index}>
    //           <h3>{video.title}</h3>
    //           <p>{video.description}</p>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>