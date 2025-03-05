আমি তোমার **সম্পূর্ণ কোড** সহজ বাংলায় লাইনে লাইনে বিশ্লেষণ করে বুঝিয়ে দিচ্ছি। 🚀  

---

# **📌 কোডের উদ্দেশ্য**
✅ **data.json** থেকে বই লোড করা  
✅ বইগুলো **UI-তে দেখানো**  
✅ **কার্টে বই যোগ করা ও মুছতে পারা**  
✅ **localStorage-এ কার্ট সংরক্ষণ করা**  
✅ **মোট দাম হিসাব ও ডিসকাউন্ট প্রয়োগ করা**  

---

# **🔍 কোডের ব্যাখ্যা (লাইন-বাই-লাইন)**  

## **1️⃣ কার্ট ডাটা সংরক্ষণ করার জন্য অ্যারে**
```js
const cart = [];
```
👉 **একটি ফাঁকা অ্যারে `cart`** তৈরি করা হয়েছে, যেখানে ব্যবহারকারীর যোগ করা বইগুলো রাখা হবে।  

---

## **2️⃣ `fetchData()` → JSON ফাইল থেকে বই লোড করা**  
```js
async function fetchData() {
  const bookContainer = document.getElementById("book_container");
```
👉 **বই দেখানোর জন্য `book_container` div-টি সিলেক্ট করা হয়েছে।**  

```js
  try {
    const response = await fetch("./data.json");
    const books = await response.json();
```
👉 **`fetch("./data.json")`** দিয়ে **বইয়ের ডাটা আনা হয়েছে।**  
👉 **`await response.json()`** দিয়ে JSON ডাটাকে **JavaScript অ্যারেতে** রূপান্তর করা হয়েছে।  

```js
    bookContainer.innerHTML = "";
```
👉 **পুরাতন বই লিস্ট মুছে ফেলা হয়েছে**, যাতে নতুন করে লোড করা যায়।  

---

## **3️⃣ প্রতিটি বই UI-তে দেখানো**
```js
    books.forEach((book, index) => {
```
👉 **`forEach()` লুপ ব্যবহার করে প্রতিটি বই নিয়ে কাজ করা হচ্ছে।**  

```js
      const bookItem = document.createElement("div");
      bookItem.classList.add("ebook");
```
👉 **নতুন `div` তৈরি করা হয়েছে** এবং **"ebook" ক্লাস যোগ করা হয়েছে।**  

```js
      bookItem.innerHTML = `
        <p class="title">${book.title}</p>
        <div class="imgs"><img src="${book.src}" alt="${book.title}"></div>
        <p class="price">৳${book.price}</p>
        <button class="cart_btn" data-id="${index}">Add To Cart</button>
      `;
```
👉 **বইয়ের নাম, ছবি, দাম ও "Add To Cart" বোতাম UI-তে যোগ করা হয়েছে।**  

```js
      bookContainer.appendChild(bookItem);
```
👉 **`bookContainer`-এ প্রতিটি বই যোগ করা হচ্ছে।**  

---

## **4️⃣ "Add To Cart" বোতামে ক্লিক করলে বই কার্টে যোগ হবে**
```js
    document.querySelectorAll(".cart_btn").forEach((button) => {
      button.addEventListener("click", function () {
        const bookIndex = this.getAttribute("data-id");
        addToCart(books[bookIndex]);
      });
    });
```
👉 **"Add To Cart" বোতামগুলোর জন্য ইভেন্ট লিসেনার যোগ করা হয়েছে।**  
👉 **বোতামে ক্লিক করলে `addToCart(books[bookIndex])` ফাংশন কল হবে।**  

---

## **5️⃣ `saveCartToLocalStorage()` → কার্টকে Local Storage-এ সংরক্ষণ করা**
```js
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
```
👉 **কার্ট ডাটাকে `JSON.stringify(cart)` ব্যবহার করে স্ট্রিং-এ রূপান্তর করে localStorage-এ সংরক্ষণ করা হয়েছে।**  

---

## **6️⃣ `loadCartFromLocalStorage()` → কার্ট লোড করা**
```js
function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem("cart");
```
👉 **localStorage থেকে "cart" নামে সংরক্ষিত ডাটা নেওয়া হয়েছে।**  

```js
  if (savedCart) {
    cart.length = 0;
    cart.push(...JSON.parse(savedCart));
    updateCart();
    calculateTotal();
  }
}
```
👉 **যদি `savedCart` থেকে ডাটা পাওয়া যায়:**  
✅ কার্ট ফাঁকা করা হচ্ছে  
✅ **পুরাতন ডাটা `cart`-এ যোগ করা হচ্ছে**  
✅ **কার্ট ও মোট দাম আপডেট করা হচ্ছে**  

---

## **7️⃣ `addToCart()` → বই কার্টে যোগ করা**
```js
function addToCart(book) {
  const exists = cart.some((item) => item.id === book.id);
```
👉 **চেক করা হচ্ছে বইটি আগেই কার্টে আছে কিনা।**  

```js
  if (!exists) {
    cart.push(book);
    saveCartToLocalStorage();
    updateCart();
    calculateTotal();
  } else {
    alert("This book is already in the cart!");
  }
}
```
✅ যদি বই **কার্টে না থাকে**, তাহলে কার্টে যোগ করে **localStorage-এ সংরক্ষণ করা হয়।**  
✅ তারপর **UI আপডেট ও মোট দাম গণনা করা হয়।**  
✅ যদি বই **আগেই কার্টে থাকে, তাহলে "Already in the cart" দেখানো হয়।**  

---

## **8️⃣ `removeFromCart()` → বই কার্ট থেকে মুছতে পারা**
```js
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCartToLocalStorage();
  updateCart();
  calculateTotal();
}
```
✅ **`cart.splice(index, 1)`** ব্যবহার করে **নির্দিষ্ট বই কার্ট থেকে সরানো হয়।**  
✅ **localStorage-এ কার্ট আপডেট করা হয়।**  
✅ **UI আপডেট ও মোট দাম পুনরায় গণনা করা হয়।**  

---

## **9️⃣ `updateCart()` → কার্ট UI আপডেট করা**
```js
function updateCart() {
  const cartContainer = document.getElementById("cart_container");
  cartContainer.innerHTML = "";
```
👉 **পুরাতন কার্ট UI ক্লিয়ার করা হচ্ছে।**  

```js
  cart.forEach((cartItem, index) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("ebook");
```
👉 **প্রতিটি কার্ট আইটেমের জন্য নতুন `div` তৈরি করা হচ্ছে।**  

```js
    cartItemDiv.innerHTML = `
      <p class="title">${cartItem.title}</p>
      <div class="imgs"><img src="${cartItem.src}" alt="${cartItem.title}"></div>
      <p class="price">৳${cartItem.price}</p>
      <button class="remove_btn" data-id="${index}">Remove</button>
    `;
```
👉 **বইয়ের নাম, ছবি, দাম ও "Remove" বোতাম দেখানো হচ্ছে।**  

```js
  cartContainer.appendChild(cartItemDiv);
```
👉 **বইটি UI-তে যোগ করা হচ্ছে।**  

```js
  document.querySelectorAll(".remove_btn").forEach((button) => {
    button.addEventListener("click", function () {
      const cartIndex = parseInt(this.getAttribute("data-id"));
      removeFromCart(cartIndex);
    });
  });

  calculateTotal();
}
```
👉 **"Remove" বোতামে ক্লিক করলে `removeFromCart()` ফাংশন কল হবে।**  

---

## **🔟 মোট দাম গণনা করা**
```js
function calculateTotal() {
  const totalPriceElement = document.getElementById("total_price");

  let total = cart.reduce((sum, book) => sum + book.price, 0);
  totalPriceElement.textContent = `৳${total.toFixed(2)}`;

  applyDiscount();
}
```
👉 **`reduce()` দিয়ে মোট দাম গণনা করা হয়েছে।**  

---

## **🔟 ডিসকাউন্ট প্রয়োগ করা**
```js
function applyDiscount() { 
  ...
  let discountedPrice = total - (total * discount) / 100;
  finalPriceElement.textContent = `৳${discountedPrice.toFixed(2)}`;
}
```
👉 **ডিসকাউন্ট শতাংশ অনুযায়ী মূল্যের হিসাব করা হচ্ছে।**  

---

## **🔥 শেষ কথা**
📌 **বই লোড → কার্টে যোগ → localStorage → UI আপডেট → মোট দাম → ডিসকাউন্ট**  
📌 **এটি একটি সম্পূর্ণ বই কেনার কার্ট সিস্টেম!** 🚀  

এখন কি পুরোপুরি বুঝতে পেরেছো? 😃🔥