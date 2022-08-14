// const { GET } = require("mongoose");
const go = document.getElementById("add-coffee");
const result = document.getElementById("result");
const nameInput = document.getElementById("name-input");
const priceInput = document.getElementById("price-input");
const imageURLInput = document.getElementById("image-url-input");

// setting up our coffee data
// const latte = {
//     name: "Long Black",
//     price: 4.00,
//     image_url: "https://www.waterymouthcafe.co.nz/wp-content/uploads/2017/07/The-insiders-guide-to-great-coffee-from-the-baristas-at-Watery-Mouth-cafe-Blenheim1-500x500.jpg"
// }

go.onclick = () => {
    console.log("clicked");
    $.ajax({
        url: `http://localhost:3000/addCoffee`,
        // use the post type to create data somewhere
        // requesting to POST our data
        type: 'POST',
        // we can send objects through to the backend, using the data argument
        data: {
            name: nameInput.value,
            price: priceInput.value,
            image_url: imageURLInput.value
        },
        success: () => {
            console.log("A new coffee was added.")
        },
        error: () => {
            console.log("Error: cannot reach the backend")
        }
    })
}

let renderCoffees = (coffees) => {
    console.log("The render coffee function is running")
    console.log(coffees)
    coffees.forEach((item) => {
        result.innerHTML += `
        <div class="coffee-article">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <img src="${item.image_url}" alt="${item.name}">
        </div>
        `;
    })
}

$.ajax({
    type: "GET",
    url: 'http://localhost:3000/allCoffee',
    //your success function contains an object which can be named anything
    success: (coffees) => {
        renderCoffees(coffees);
    },
    error: (error) => {
        console.log(error)
    }
})