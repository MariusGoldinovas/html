import '../products/Products.css'

const Products = ({ products }) => {

  const ColorStars = ({ rating }) => {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
  
    const stars = [];
  
    for (let i = 1; i <= maxStars; i++) {
      if (i <= fullStars) {
        // Full Star
        stars.push(
          <span key={i} className="material-symbols-outlined full-star">
            star
          </span>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        // Half Star
        stars.push(
          <span key={i} className="material-symbols-outlined half-star">
            star_half
          </span>
        );
      } else {
        // Empty Star
        stars.push(
          <span key={i} className="material-symbols-outlined">
            star
          </span>
        );
      }
    }
    return <>{stars}</>;
  };

  return (
    <div className="products-container">
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        products.map((item, index) => {

          const price = parseFloat(item.price) || 0;
          const discount = parseFloat(item.discount) || 0;
          const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;

          return (
            <div key={index} className="container">
              <div className="picture">
                <div className="discount">
                  {item.discount > 0 ? `${item.discount}% off` : 'No discount'}
                </div>
                <img src={item.image} alt={item.title} style={{ width: "100px" }} />
              </div>
              <div className="about">
                <div className="name">{item.brand} {item.title}</div>
                <div className="rating">
                  <ColorStars rating={item.rating} />
                </div>
                <div className="text">{item.description}</div>
              </div>
              <div className="buy">
                <div className="price">${discountedPrice.toFixed(2)}</div>
                <button className="add-to-cart-button">Add to Cart</button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Products;
