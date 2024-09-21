
import Rating from '../Rating/Rating'
import Button from '../Button/Button'
import Price from '../Price/Price'
import './Card.css'

const Card = ({ data }) => {
    return (
      <div className="d-flex p-2 justify-content-center ">
        <div className="row align-items-center mt-4">
          <div className="col-3 d-flex justify-content-center  ">
            <img src={data.thumbnail} alt="" />
            <div className="small">-{data.discountPercentage}</div>
          </div>
          <div className="col-4">
            <div className="item-name">{data.title}</div>
            <div className="stars"><Rating rating={data.rating}/></div>
            <p>{data.description}</p>
          </div>
          <div className="col-2">
            <Price price={data.price} discount={data.discountPercentage} />
            <Button />
          </div>
        </div>
      </div>
    );
  };
  
  export default Card;
