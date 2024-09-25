import { useState } from 'react';

function CartProduct({ cart, updateQuantity, deleteItem }) {
  const [quantity, setQuantity] = useState(cart.quantity || 1);

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    updateQuantity(cart.id, quantity + 1);  // Update in parent component or local storage
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      updateQuantity(cart.id, quantity - 1);  // Update in parent component or local storage
    }
  };

  const handleDelete = () => {
    deleteItem(cart.id);  // Trigger item deletion from the cart
  };

  const price = parseFloat(cart.price) || 0;  // Ensure price is a valid number

  return (
    <div className="row-items">
      <div className="item">
        <img src={cart.image} alt={cart.title} />
        <div className="item-about">
          <div className="name">{cart.title}</div>
        </div>
      </div>
      <div className="item-quantity">
        <span onClick={handleDecrease} className="material-symbols-outlined item-remove">remove</span>
        <div className="item-selected-quantity">{quantity}</div>
        <span onClick={handleIncrease} className="material-symbols-outlined item-add">add</span>
      </div>
      <div className="item-price-remove">
        <div className="item-price">${(price * quantity).toFixed(2)}</div>
        <div onClick={handleDelete} className="item-delete">x</div>
      </div>
    </div>
  );
}

export default CartProduct;

