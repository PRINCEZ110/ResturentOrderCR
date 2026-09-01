//1. store the price of all items in an object//
const price = {
    1:300,
    2:250,
    3:480,
    4:450,
    5:200,
};

//2. Function to Increase quantity//
function increaseQuantity(itemId){

    // Step A: Find the HTML element that shows the quantity for this item//
    const quantityElement = document.getElementById("qty-" + itemId);

    //Step B: Read the current quantity from the element
    let currentQuantity = parseInt(quantityElement.textContent);

    //step C: Increae the quqantity by 1
    currentQuantity = currentQuantity +1;

    //Step D: Update the Html to show the new quantity 
    quantityElement.textContent = currentQuantity;

    //Step E: Update the item total for this item
    updateItemTotal(itemId, currentQuantity);

}