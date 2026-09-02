//1. store the price of all items in an object//
const prices = {
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

    //step C: Increase the quantity by 1
    currentQuantity = currentQuantity + 1;

    //Step D: Update the HTML to show the new quantity 
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

    // Decrease the quantity by 1, only if its greater than 0
    if (currentQuantity > 0) {
        currentQuantity = currentQuantity - 1;
    }

    //update the HTML
    quantityElement.textContent = currentQuantity;

    // update the item total
    updateItemTotal(itemId, currentQuantity);
}

//4. Function to update the item total (price * quantity)
function updateItemTotal(itemId, quantity) {

    //Get the price for this item from our prices object 
    const itemPrice = prices[itemId];

    //calculate: item total = Price * Quantity
    const total = itemPrice * quantity;

    //Find the HTML element that shows the total for this item
    const totalElement = document.getElementById("total-" + itemId);

    //Update the HTML to show the new total
    totalElement.textContent = total;
    
    //update the summary after updating the item total
    updateSummary();    
}

//5. function to update the order summary
function updateSummary() {

    //Get the container where we will put the summary items.
    // 🔥 FIXED: Changed "summary-Items" to "summary-items" (lowercase 'i')
    const summaryContainer = document.getElementById("summary-items");

    //Prepare a variable to store the subtotal
    let subtotal = 0;

    //Prepare a variable to store the HTML we will build
    let htmlContent = ""; 

    // Loop through all 5 items
    for (let i = 1; i <= 5; i++) {
        const qtyElement = document.getElementById("qty-" + i);
        let quantity = parseInt(qtyElement.textContent);

        // Only show items with quantity greater than 0
        if (quantity > 0) {
            const price = prices[i];
            const lineTotal = price * quantity;
            subtotal = subtotal + lineTotal;

            // Get the item name
            let itemName = "";
            if (i === 1) itemName = "Chicken Burger";
            else if (i === 2) itemName = "Veg Burger";
            else if (i === 3) itemName = "Chicken Pizza";
            else if (i === 4) itemName = "Chicken Biryani";
            else if (i === 5) itemName = "French Fries";

            // Build the HTML for this item in the summary
            htmlContent = htmlContent + `
                <div class="summary-line">
                    <span><strong>${itemName}</strong></span>
                    <span>${quantity} x Rs. ${price}</span>
                    <span><strong>Rs. ${lineTotal}</strong></span>
                </div>
            `;
        }
    }

    // If no items were added, show a message
    if (htmlContent === "") {
        htmlContent = "<p>No items selected yet.</p>";
    }

    // Update the summary container with our built HTML
    summaryContainer.innerHTML = htmlContent;

    // Update the subtotal display
    const subtotalElement = document.getElementById("subtotal");
    subtotalElement.textContent = subtotal;
}