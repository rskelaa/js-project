function getProducts() {
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    // .then(json=>console.log(json))
    .then(data => { showProducts(data)});
}

let cartItems = [];
let productList =[];

function showProducts(data) {
    productList = data;
    sessionStorage.setItem("productsArray", JSON.stringify(data));
    if (sessionStorage.getItem("cartItems") !== null ){
        let temp = sessionStorage.getItem("cartItems");
        cartItems = JSON.parse(temp);
        document.getElementById("cart").innerText= "Cart ("+cartItems.length+")";
    }
    else {
        sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    var productListEl = document.getElementById("productList");
    data.forEach(products => {
        const {id, title, image, price} = products;
        const productsEl = document.createElement("div");
        productsEl.classList.add("border", "rounded-md", "shadow-md");
        productsEl.innerHTML = `
        <img class="img-container" style="height: 360px; width: 100%;" src="${image}" alt="">
        <a href="">${title}</a>
                <p>${price}</p>
                <button onClick="addcart(${id})" >Add Cart</button>
        `
        productListEl.appendChild(productsEl);

    });
}

function addcart(pid){
    let index = productList.findIndex(x=>x.id==pid);
    
    const {id, title, price} = productList[index];

    var cartItem = {
        id: id,
		productTitle: title,
		price: price,
        qty:1,
        tot : price
	};

    cartItems.push(cartItem);

    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));

    document.getElementById("cart").innerText= "Cart ("+cartItems.length+")";
}
getProducts();