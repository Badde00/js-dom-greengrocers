const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: []
};

document.addEventListener('DOMContentLoaded', () => {
  const storeItemList = document.querySelector('.store--item-list');

  state.items.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div class="store--item-icon">
        <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
      </div>
      <button>Add to cart</button>
    `;

    const button = listItem.querySelector('button');
    button.addEventListener('click', () => addToCart(item));

    storeItemList.appendChild(listItem);
  });
});


function addToCart(item) {
  const cartItem = state.cart.find(cartItem => cartItem.id === item.id);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    state.cart.push({ ...item, quantity: 1 });
  }

  renderCart();
  updateTotal();
}


function updateTotal() {
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.querySelector('.total-number').textContent = `£${total.toFixed(2)}`;
}


function renderCart() {
  const cartItemList = document.querySelector('.cart--item-list');
  cartItemList.innerHTML = '';

  state.cart.forEach(cartItem => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img class="cart--item-icon" src="assets/icons/${cartItem.id}.svg" alt="${cartItem.name}" />
      <p>${cartItem.name}</p>
      <button class="quantity-btn remove-btn center">-</button>
      <span class="quantity-text center">${cartItem.quantity}</span>
      <button class="quantity-btn add-btn center">+</button>
    `;

    const removeButton = listItem.querySelector('.remove-btn');
    const addButton = listItem.querySelector('.add-btn');

    removeButton.addEventListener('click', () => updateCartItemQuantity(cartItem, -1));
    addButton.addEventListener('click', () => updateCartItemQuantity(cartItem, 1));

    cartItemList.appendChild(listItem);
  });
}


function updateCartItemQuantity(cartItem, amount) {
  cartItem.quantity += amount;

  if (cartItem.quantity <= 0) {
    state.cart = state.cart.filter(item => item.id !== cartItem.id);
  }

  renderCart();
  updateTotal();
}

