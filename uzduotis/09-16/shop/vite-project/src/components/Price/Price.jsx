import './Price.css'


const Price = ({ price, discount }) => {
    let discountPrice = discount > 1;
  
    return (
      <div className="price">
        {discountPrice ? (
          <>
            <div className="org" style={{textDecoration: 'line-through'}}>${price}</div>
            <div className="disc">
              ${((price - price * (discount / 100)).toFixed(2))}
            </div>
          </>
        ) : (
          `$${price}`
        )}
      </div>
    );
  };
  
  export default Price;