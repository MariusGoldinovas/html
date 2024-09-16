import './Rating.css'

const Rating = ({ rating }) => {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
  
    const stars = [];
  
    for (let i = 1; i <= maxStars; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="material-symbols-outlined full-star">star</span>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className="material-symbols-outlined half-star">star_half</span>);
      } else {
        stars.push(<span key={i} className="material-symbols-outlined">star_outline</span>);
      }
    }
  
    return <div className="rating">{stars}</div>;
  };
  
  export default Rating;
  