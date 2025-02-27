Great! Now let me **teach you step by step** how we achieved this.  
I'll **explain every part** of the code, **why** we wrote it, and how it works.  

---

## **📌 Step 1: Understanding the Requirements**
We needed to build a **bookstore shopping cart** where users can:  
✅ View books from `data.json`  
✅ Add books to the cart (without duplicates)  
✅ Remove books from the cart  
✅ See the **total price** update dynamically  
✅ Apply a **discount** to reduce the total price  

---

## **📌 Step 2: Setting Up the Data Fetching**
### **📍 Why?**  
We need to get the book data from `data.json` and display it on the page.  

### **📝 Code Explanation**
```js
async function fetchData() {
  const bookContainer = document.getElementById("book_container");

  try {
    const response = await fetch("./data.json"); // Fetch the JSON file
    const books = await response.json(); // Convert response to JavaScript object
    
    bookContainer.innerHTML = ""; // Clear previous books
    
    books.forEach((book, index) => {
      const bookItem = document.createElement("div"); // Create a div for each book
      bookItem.classList.add("ebook");

      // Book details (Title, Image, Price, Button)
      bookItem.innerHTML = `
        <p class="title">${book.title}</p>
        <div class="imgs"><img src="${book.src}" alt=""></div>
        <p class="price">$${book.price}</p>
        <button class="cart_btn" data-id="${index}">Add To Cart</button>
      `;

      bookContainer.appendChild(bookItem); // Add book to the page
    });

    // Add event listeners to all "Add To Cart" buttons
    document.querySelectorAll(".cart_btn").forEach((button) => {
      button.addEventListener("click", function () {
        const bookIndex = this.getAttribute("data-id");
        addToCart(books[bookIndex]); // Call addToCart function
      });
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
```

### **💡 What happens here?**
1. We **fetch** the data from `data.json` using `fetch()`.  
2. We **convert** the response to a JavaScript object using `.json()`.  
3. We **loop through the books** and create a `<div>` for each book.  
4. We add **a button (`Add to Cart`)** to each book.  
5. We add an **event listener** to each button to handle adding books to the cart.  

---

## **📌 Step 3: Adding Books to the Cart**
### **📍 Why?**  
When the user clicks `"Add to Cart"`, we need to store the book in an array and update the UI.  

### **📝 Code Explanation**
```js
const cart = []; // Initialize an empty cart

function addToCart(book) {
  // Check if the book already exists in the cart
  const exists = cart.some(item => item.title === book.title);
  
  if (!exists) {
    cart.push(book); // Add book to cart
    updateCart(); // Update cart UI
  } else {
    alert("This book is already in the cart!");
  }
}
```

### **💡 What happens here?**
1. We **check if the book is already in the cart** using `.some()`.  
2. If it's **not in the cart**, we **add it**.  
3. If it's **already in the cart**, we **show an alert**.  
4. We **update the cart UI** by calling `updateCart()`.  

---

## **📌 Step 4: Displaying the Cart**
### **📍 Why?**  
After adding books to the cart, we need to **show** them on the page.  

### **📝 Code Explanation**
```js
function updateCart() {
  const cartContainer = document.getElementById("cart_container");
  cartContainer.innerHTML = ""; // Clear previous cart items

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

  calculateTotal(); // Update total price
}
```

### **💡 What happens here?**
1. We **clear** the cart container.  
2. We **loop through the cart** and create a `<div>` for each book.  
3. We add a **"Remove" button** for each book.  
4. We **add event listeners** to remove books.  
5. We **update the total price**.  

---

## **📌 Step 5: Removing Books from the Cart**
### **📍 Why?**  
The user should be able to **remove books** from the cart.  

### **📝 Code Explanation**
```js
function removeFromCart(index) {
  cart.splice(index, 1); // Remove book from cart
  updateCart(); // Update UI
}
```

### **💡 What happens here?**
1. We **remove** the book from the `cart` array using `.splice()`.  
2. We **update the cart UI**.  

---

## **📌 Step 6: Calculating the Total Price**
### **📍 Why?**  
We need to **show the total price** of books in the cart.  

### **📝 Code Explanation**
```js
function calculateTotal() {
  const totalPriceElement = document.getElementById("total_price");
  const finalPriceElement = document.getElementById("final_price");

  const total = cart.reduce((sum, book) => {
    return sum + parseFloat(book.price);
  }, 0);

  totalPriceElement.textContent = `$${total.toFixed(2)}`;

  finalPriceElement.textContent = `$${total.toFixed(2)}`; // Update final price
}
```

### **💡 What happens here?**
1. We **use `.reduce()`** to sum up all the book prices.  
2. We **display** the total price.  
3. We **update** the final price (before discount).  

---

## **📌 Step 7: Applying a Discount**
### **📍 Why?**  
Users should be able to apply a **discount percentage** to reduce the total price.  

### **📝 Code Explanation**
```js
function applyDiscount() {
  const discountInput = document.getElementById("discount_input").value;
  const totalPriceElement = document.getElementById("total_price");
  const finalPriceElement = document.getElementById("final_price");

  const total = parseFloat(totalPriceElement.textContent.replace("$", ""));
  let discount = parseFloat(discountInput);

  if (isNaN(discount) || discount < 0 || discount > 100) {
    alert("Please enter a valid discount (0-100)");
    return;
  }
  
  const discountedPrice = total - (total * discount / 100);
  finalPriceElement.textContent = `$${discountedPrice.toFixed(2)}`;
}

document.getElementById("apply_discount").addEventListener("click", applyDiscount);
```

### **💡 What happens here?**
1. We **get the discount value** from the input field.  
2. We **validate** that it's a number between `0-100`.  
3. We **apply the discount** by reducing the total price.  
4. We **update the final price**.  

---

## **🎯 Summary**
✅ We **fetched book data** and displayed it.  
✅ We **added books to the cart** (without duplicates).  
✅ We **removed books from the cart**.  
✅ We **updated the total price dynamically**.  
✅ We **applied a discount** to the total price.  

Now you **understand everything step by step** like a real **professional developer**! 🎯🔥  
Would you like to add more features? 🚀