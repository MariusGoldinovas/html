import { useState, useEffect } from 'react';
import CartProduct from '../cart-product/CartProduct';
import Products from '../products/Products'
import { Link } from 'react-router-dom';

import './Style.css';
import './Shadow.css';
import './Cart.css';

function Cart() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
    setProducts(cartProducts);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    const updatedCart = products.map((product) =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    );
    setProducts(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const deleteItem = (id) => {
    const updatedCart = products.filter((product) => product.id !== id);
    setProducts(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotalPrice = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  };

  return (
    <>
      <div className="shadow"></div>
      <div className="buy-cart">
        <div className="items-cart">
          <div className="top">
            <div className="left">Shopping cart</div>
            <div className="right"></div>
          </div>
          <div className="buy-middle">
            {products.map((product, index) => (
              <CartProduct
                key={index}
                cart={product}
                updateQuantity={updateQuantity}
                deleteItem={deleteItem}
              />
            ))}
          </div>
          <div>
            <Link to="/products">Back to shop</Link>
          </div>
        </div>
        <div className="summary">
          <div className="top">Summary</div>
          <div className="middle">
            <div className="items">
              <div className="summary-total-items">{products.length} items</div>
              <div className="summary-total-items-price">${calculateTotalPrice()}</div>
            </div>
            <div className="shipping">
              <form>
                <select name="delivery" id="delivery-options">
                  <option value="5">Standard Delivery: $5</option>
                  <option value="10">Express Delivery: $10</option>
                  <option value="20">Super Fast Delivery: $20</option>
                </select>
              </form>
            </div>
            <div className="discount-code">
              <form>
                <input type="text" />
              </form>
            </div>
            <div className="bottom">
              <div className="total">
                <div className="total-price">TOTAL PRICE</div>
                <div className="total-delivery">${calculateTotalPrice()}</div>
              </div>
              <div className="buy-button">BUY</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
