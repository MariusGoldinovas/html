
let body = '';

function nuolaida(preke) {
    if (preke.discountPercentage > 0) {
        const discountedPrice = preke.price - ((preke.discountPercentage / 100) * preke.price);
        return `<span style="color:red;">$${discountedPrice.toFixed(2)}</span>
        <span style="text-decoration: line-through;vertical-align: sub">$${preke.price}</span>`;

    } else {
        return `$${preke.price}`;
    }
}

function spalvotosStars(rating) {
    const maxStars = 5;
    let starHTML = '';
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

for(const preke of prekes) {
    body += 
`<div class="container">
    <div class="picture">
        <div class="discount">${ '- ' + preke.discountPercentage.toFixed(1) +' %'}</div>
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
</div>`
}

document.querySelector('.result').innerHTML = body;

let cart = [];

function addToCart(preke) {
  // Check if the item is already in the cart
  const itemIndex = cart.findIndex(item => item.id === preke.id);

  if (itemIndex > -1) {
      // If the item is already in the cart, increase its quantity
      cart[itemIndex].quantity += 1;
  } else {
      // Otherwise, add the item to the cart with quantity 1
      cart.push({
          id: preke.id,
          name: preke.title,
          price: preke.price,
          discountPrice: preke.price - ((preke.discountPercentage / 100) * preke.price),
          quantity: 1
      });
  }

  // Update the cart display or storage
  // updateCartDisplay();
  itemsQuantity();
}
// Function to update the cart display (this is just a simple example)
function updateCartDisplay() {
  let cartContent = '';
  cart.forEach(item => {
      cartContent += `<div>${item.name} - Quantity: ${item.quantity} - Price: $${item.discountPrice.toFixed(2)}</div>`;
  });
  document.querySelector('.cart').innerHTML = cartContent;
}

function itemsQuantity(){
    let cartQuantity = 0;
    cart.forEach(item => {
      cartQuantity += item.quantity
    });
    document.querySelector('.quantity').innerHTML = cartQuantity;
}

// Function to attach event listeners to all "Add to Cart" buttons
function attachAddToCartListeners() {
  const buttons = document.querySelectorAll('.add-to-cart-button');
  buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
          addToCart(prekes[index]); // Pass the corresponding product object to addToCart
      });
  });
}

// Call this function after the products are rendered
attachAddToCartListeners();