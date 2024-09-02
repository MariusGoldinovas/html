let body = "";

function nuolaida(preke) {
  if (preke.discountPercentage > 0) {
    const discountedPrice = preke.price - (preke.discountPercentage / 100) * preke.price;
    return `<span style="color:red;">$${discountedPrice.toFixed(2)}</span>
        <span style="text-decoration: line-through;vertical-align: sub">$${preke.price}</span>`;
  } else {
    return `$${preke.price}`;
  }
}

function spalvotosStars(rating) {
  const maxStars = 5;
  let starHTML = "";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 1; i <= maxStars; i++) {
    if (i <= fullStars) {
      starHTML += `<span class="material-symbols-outlined full-star">star</span>`;
    } else if (i === fullStars + 1 && hasHalfStar) {
      starHTML += `<span class="material-symbols-outlined half-star">star_half</span>`;
    } else {
      starHTML += `<span class="material-symbols-outlined">star</span>`;
    }
  }

  return starHTML;
}

for (const preke of prekes) {
  body += `<div class="container">
    <div class="picture">
        <div class="discount">${
          "- " + preke.discountPercentage.toFixed(1) + " %"
        }</div>
        <img src=${preke.thumbnail} alt="">
    </div>
    <div class="about">
        <div class="name">${preke.brand} ${preke.title}</div>
        <div class="rating">${spalvotosStars(preke.rating)}</div>
        <div class="text"> ${preke.description}</div>
    </div>
    <div class="buy">
        <div class="price">$ ${nuolaida(preke)}</div>
        <button class="add-to-cart-button"> Add to Cart</button>
    </div>
</div>`;
}

document.querySelector(".result").innerHTML = body;

///------------------------------------------------------------
// Function to attach event listeners to all "Add to Cart" buttons
function addItemCart() {
  const buttons = document.querySelectorAll(".add-to-cart-button");
    buttons.forEach((button, index) => {
    button.onclick = function() {
      addToCart(prekes[index]);
    };
  });
}
addItemCart();

// Display quantity of items in cart
function itemsQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector(".quantity").innerHTML = cartQuantity;
  document.querySelector(".right").innerHTML = `${cartQuantity} items`;
  document.querySelector(".summary-total-items").innerHTML = `Items ${cartQuantity}`;
}


const cart = [];

function addToCart(preke) {
  const itemIndex = cart.findIndex((item) => item.id === preke.id);
  if (itemIndex > -1) {
    cart[itemIndex].quantity += 1;
  } else {
    cart.push({
      img: preke.thumbnail,
      id: preke.id,
      name: preke.title,
      price: preke.price,
      discountPrice: preke.price - (preke.discountPercentage / 100) * preke.price,
      quantity: 1,
    });
  }

  itemsQuantity();
  updateBuyMiddle();
  totalShippingPrice();
}

console.log(cart);

function addTo() {
  const itemIndex = cart.findIndex((item) => item.id === preke.id);
  if (itemIndex > -1) {
    cart[itemIndex].quantity += 1;
  }
  itemsQuantity();
  updateBuyMiddle();
  totalShippingPrice();
}

function removeItem() {
  const itemIndex = cart.findIndex((item) => item.id);
  if (itemIndex > -1) {
    cart[itemIndex].quantity -= 1;
  } else if(cart[itemIndex].quantity === 0){
      cart.splice(itemIndex, 1);
  }
  itemsQuantity();
  updateBuyMiddle();
  totalShippingPrice();
}


const main = document.querySelector(".main");
const buyCart = document.querySelector(".buy-cart");

function openCart() {
  document.querySelector("#cart-btn");
  main.style.display = "none";
  buyCart.style.display = "flex";
}

function closeCart() {
  document.querySelector("#back-main");
  main.style.display = "flex";
  buyCart.style.display = "none";
}

let buyMiddle = "";

function updateBuyMiddle() {
  buyMiddle = "";
 let index = cart.item
  for (const item of cart) {
    buyMiddle += `<div class="row-items">  
        <div class="item">
            <img src= ${item.img} alt="">
            <div class="item-about">
                    <div class="name">${item.name}</div>
            </div>
        </div>
        <div class="item-quantity">
            <span onclick="removeItem()" class="material-symbols-outlined item-remove">remove</span>
            <div class="item-selected-quantity">${item.quantity}</div>
            <span onclick="addTo()" class="material-symbols-outlined item-add ">add</span>
        </div>
        <div class="item-price-remove">
            <div class="item-price">$${item.price}</div>
            <div onclick="itemDelete()" class="item-delete">x</div>
        </div>
    </div>`;
  }
  document.querySelector(".buy-middle").innerHTML = buyMiddle;
}
updateBuyMiddle();


// Function to calculate the total price of cart items
function calculateTotalPrice() {
    return cart.reduce((total, item) => total + (item.discountPrice * item.quantity), 0);
}


function totalShippingPrice() {
    const baseTotalPrice = calculateTotalPrice();
    const deliveryCost = parseFloat(document.querySelector('#delivery-options').value);
    const finalTotalPrice = baseTotalPrice + deliveryCost;

    document.querySelector('.total-delivery').innerHTML = `$${finalTotalPrice.toFixed(2)}`;
    document.querySelector('.summary-total-items-price').innerHTML = `$${baseTotalPrice.toFixed(2)}`;
}

// Event listener for the delivery option change
document.querySelector('#delivery-options').addEventListener('change', function() {
    totalShippingPrice(); 
});

function itemDelete(index) {
    cart.splice(index, 1);
    updateBuyMiddle();
    itemsQuantity();
    calculateTotalPrice();
    totalShippingPrice();
  }
