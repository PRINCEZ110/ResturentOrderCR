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
    const summaryContainer = document.getElementById("summary-items");
    let subtotal = 0;
    let htmlContent = ""; 
    for (let i = 1; i <= 5; i++) {
        const qtyElement = document.getElementById("qty-" + i);
        let quantity = parseInt(qtyElement.textContent);

        
        if (quantity > 0) {
            const price = prices[i];
            const lineTotal = price * quantity;
            subtotal = subtotal + lineTotal;

            
            let itemName = "";
            if (i === 1) itemName = "Chicken Burger";
            else if (i === 2) itemName = "Veg Burger";
            else if (i === 3) itemName = "Chicken Pizza";
            else if (i === 4) itemName = "Chicken Biryani";
            else if (i === 5) itemName = "French Fries";

            
            htmlContent = htmlContent + `
                <div class="summary-line">
                    <span><strong>${itemName}</strong></span>
                    <span>${quantity} x Rs. ${price}</span>
                    <span><strong>Rs. ${lineTotal}</strong></span>
                </div>
            `;
        }
    }

    
    if (htmlContent === "") {
        htmlContent = "<p>No items selected yet.</p>";
    }

    
    summaryContainer.innerHTML = htmlContent;
    const subtotalElement = document.getElementById("subtotal");
    subtotalElement.textContent = subtotal;
}

// 6. order type & delivery charge
let deliveryCharge = 0;
function updateorderType() {
    const selectedType = document.querySelector('input[name="orderType"]:checked');

    if (selectedType) {
        const type = selectedType.ariaValueMax;
        if (type === 'delivery') {
            deliveryCharge = 100;
        } else {
            deliveryCharge = 0;
        }
    }

    document.getElementById('delivery-charge').textContent = deliveryCharge;

    updateSummary();
}

document.addEventListener('DOMContentLoaded', function () {
    const radioButtons = document.querySelectorAll('input[name="orderType"]');
    radioButtons.forEach(function(radio) {
        radio.addEventListener('change', updateOrderType);
    });
    updateOrderType();
})