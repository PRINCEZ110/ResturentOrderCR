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

//3. Function to DECREASE quantity 
function decreaseQuantity(itemId) {

    //Find the Quantity element
    const quantityElement = document.getElementById("qty-" + itemId);

    // Get the current quantity as a number
    let currentQuantity = parseInt(quantityElement.textContent);

    // Decrease the quantity by 1, only if its greater then 0 or but not below 0
    if (currentQuantity > 0) {
        currentQuantity = currentQuantity -1;
    }

    //update the Html
    quantityElement.textContent = currentQuantity;

    // update the item total
    updateItemTotal(itemId, currentQuantity);
}

//4. Function to update the item total (price * quantity)
function updateItemTotal(itemId, quantity) {

    //Get the prce for this item from our prices object 
    const itemPrice = price[itemId];

    //calculate: item total = Price * Quantity
    const total = itemPrice * quantity;

    //Find the HTML element that shows the total for this item
    const totalElement = document.getElementById("total-" + itemId);

    //Update the HTML to show the new total
    totalElement.textContent = total;
    updateSummary();    //update the summary after updating the item total
}
