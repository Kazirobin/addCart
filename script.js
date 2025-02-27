const cart = [];

async function fetchData() {
  const bookContainer = document.getElementById("book_container");

  try {
    const response = await fetch("./data.json");
    const books = await response.json();
    
    bookContainer.innerHTML = ""; // Clear previous books
    
    books.forEach((book, index) => {
      const bookItem = document.createElement("div");
      bookItem.classList.add("ebook");

      bookItem.innerHTML = `
        <p class="title">${book.title}</p>
        <div class="imgs"><img src="${book.src}" alt=""></div>
        <p class="price">$${book.price}</p>
        <button class="cart_btn" data-id="${index}">Add To Cart</button>
      `;

      bookContainer.appendChild(bookItem);
    });

    // Attach event listeners after books are loaded
    document.querySelectorAll(".cart_btn").forEach((button) => {
      button.addEventListener("click", function () {
        const bookIndex = this.getAttribute("data-id");
        addToCart(books[bookIndex]);
      });
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to add books to the cart
function addToCart(book) {
  // Check if the book already exists in the cart
  const exists = cart.some(item => item.title === book.title);
  
  if (!exists) {
    cart.push(book);
    updateCart();
  } else {
    alert("This book is already in the cart!");
  }
}

// Function to update the cart UI
function updateCart() {
  const cartContainer = document.getElementById("cart_container");
  cartContainer.innerHTML = "";

  cart.forEach((cartItem, index) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("ebook");

    cartItemDiv.innerHTML = `
      <p class="title">${cartItem.title}</p>
      <div class="imgs"><img src="${cartItem.src}" alt=""></div>
      <p class="price">$${cartItem.price}</p>
      <button class="remove_btn" data-id="${index}">Remove</button>
    `;

    cartContainer.appendChild(cartItemDiv);
  });

  // Attach event listeners for remove buttons
  document.querySelectorAll(".remove_btn").forEach((button) => {
    button.addEventListener("click", function () {
      const cartIndex = this.getAttribute("data-id");
      removeFromCart(cartIndex);
    });
  });

  // ✅ Update total price immediately
  calculateTotal();
}

// Function to remove a book from the cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart(); // ✅ Ensure total is updated when removing items
}

// Function to calculate the total price
function calculateTotal() {
  const totalPriceElement = document.getElementById("total_price");
  const finalPriceElement = document.getElementById("final_price");

  const total = cart.reduce((sum, book) => {
    return sum + parseFloat(book.price);
  }, 0);

  totalPriceElement.textContent = `$${total.toFixed(2)}`;

  // ✅ Also update final price immediately (before discount)
  finalPriceElement.textContent = `$${total.toFixed(2)}`;
}

// Function to apply a discount
function applyDiscount() {
  const discountInput = document.getElementById("discount_input").value;
  const totalPriceElement = document.getElementById("total_price");
  const finalPriceElement = document.getElementById("final_price");

  const total = parseFloat(totalPriceElement.textContent.replace("$", ""));
  let discount = parseFloat(discountInput);

  // ✅ Ensure valid discount value (between 0-100)
  if (isNaN(discount) || discount < 0 || discount > 100) {
    alert("Please enter a valid discount (0-100)");
    return;
  }
  
  const discountedPrice = total - (total * discount / 100);
  finalPriceElement.textContent = `$${discountedPrice.toFixed(2)}`;
}

// Event listener for discount button
document.getElementById("apply_discount").addEventListener("click", applyDiscount);

// Fetch books when page loads
fetchData();
