let cartItems = [];
let cartListEl = document.getElementById("cartList");
let trCount=0;

function init(){
    // console.log(cartItemm);
    if (sessionStorage.getItem("cartItems") !== "[]" ){
        cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
        showCartItems(cartItems);
    }
    else {
        const tableRow = document.createElement("tr");
        const tableCol = document.createElement("td");
        var temp = document.createAttribute("colspan");
        temp.value = "4";
        tableCol.innerText = "No Record Found"
        tableCol.setAttributeNode(temp);
        tableRow.appendChild(tableCol);
        cartListEl.appendChild(tableRow)

    }
}
function showCartItems(cartItemm){    
    cartItemm.forEach(items => {
        trCount++;
        
        const tableRow = document.createElement("tr");
        tableRow.classList.add("tr");
        tableRow.setAttribute('id',trCount);
        tableRow.innerHTML = `
        <td>${items.productTitle}</td>
        <td>${items.price}</td>
        <td><input type="number" id="qty" onkeyup="calc(this)" value="${items.qty}">   </td>
        <td>${items.tot}</td>
        <td><button onclick="removeItem(this,${items.id})"><i class="fa-solid fa-x"></i></button></td>
        `
        cartListEl.appendChild(tableRow)
 });
}
 function calc(data){    
    const closest = data.closest(".tr");
    let priceEl = closest.children[1].innerText;
    let qty = data.value;
    let tot = priceEl * qty;

    closest.children[3].innerText = tot;
    console.log(qty);
 }

 function removeItem (buttonEl,itemId){
    const closest = buttonEl.closest(".tr");
    // let trChild = null;
    // for(var i=0;i<cartListEl.children.length;i++){ 
    //     if(cartListEl.children[i].id== closest.id){
    //         trChild=cartListEl.children[i];
    //     } 
    // };
    const index = cartItems.findIndex(item => item.id === itemId);    
    cartItems.splice(index,1);
    // cartListEl.removeChild(trChild);
    cartListEl.removeChild(closest);
 }

init();