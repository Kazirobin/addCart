// let price = [392, 34, 34, 344, 555, 3, 31, 6, 878, 454];
// async function fetchData() {
//   const book = document.getElementById("book");

//   const res = await fetch("https://www.freetestapi.com/api/v1/books");
//   let data = await res.json();
//   //   console.log(data)
//   data.slice(0, 10).forEach((item) => {
//     book.innerHTML += `<p>${item.title}</p>
//     <p >${price[item.id]}</p>
//     `;
//     console.log(item);
//   });
// }
// fetchData();

async function fetchData() {
  const book = document.getElementById("book_container")
  const data = await fetch("./data.json")
  const theData = await data.json()
  console.log(theData)
  theData.forEach(books => {
    book.innerHTML += `<div class="ebook">
                <p class="title">${books.title}</p>
                <img src="${books.src}" alt="">
                <p class="price">${books.price}</p>
                <button>Add To Cart</button>
            </div>`
  });
}
fetchData()