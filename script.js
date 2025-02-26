const cart = [];
async function fetchData() {
  const book = document.getElementById("book_container");
  const data = await fetch("./data.json");
  const theData = await data.json();
  console.log(theData);
  theData.forEach((books, index) => {
    book.innerHTML += `<div class="ebook">
                <p class="title">${books.title}</p>
                <img src="${books.src}" alt="">
                <p class="price">${books.price}</p>
                <button class="cart_btn" data-id="${index}">Add To Cart</button>
            </div>`;

    //when i click cart_btn it push my selected cart in cart array
    document.querySelectorAll(".cart_btn").forEach((book) => {
      book.addEventListener("click", function () {
        const cartBtnIndex = this.getAttribute("data-id");
        cart.push(theData[cartBtnIndex]);
        addToCart(cartBtnIndex);
      });
    });
  });
}
fetchData();

//this function create cart in cart_container
function addToCart(index) {
  const cartContainer = document.getElementById("cart_container");
  cartContainer.innerHTML = "";
  cart.forEach((cartItem, index) => {
    cartContainer.innerHTML += `
    <div class="ebook">
      <p class="title">${cartItem.title}</p>
      <img src="${cartItem.src}" alt="">
      <p class="price">${cartItem.price}</p>
      <button class="remove_btn" data-id="${index}">Remove</button>
    </div>
  `;
    document.querySelectorAll(".remove_btn").forEach((cart) => {
      cart.addEventListener("click", function () {
        const cartIndex = this.getAttribute("data-id");
        removeCart(cartIndex);
        console.log(cartIndex);
      });
    });
  });
}

function removeCart(index) {
  cart.splice(index, 1);
  addToCart();
}
