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
    
    // Update subtotal
    const subtotalElement = document.getElementById("subtotal");
    subtotalElement.textContent = subtotal;
    
    //  Calculate and update Grand Total
    const grandTotal = subtotal + deliveryCharge;
    document.getElementById("grand-total").textContent = grandTotal;
}


// 6. Order Type & Delivery Charge
let deliveryCharge = 0;
function updateOrderType() {
    const selectedType = document.querySelector('input[name="orderType"]:checked');
    if (selectedType) {
       
        const type = selectedType.value;
        if (type === 'delivery') {
        deliveryCharge = 100;
    
         document.getElementById('address-container').classList.remove('hidden');
        } else {
         deliveryCharge = 0;
    
         document.getElementById('address-container').classList.add('hidden');
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
});

// 7. Place Order Button //
function placeOrder() {
    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const customerAddress = document.getElementById('customerAddress').value.trim();

    let hasItems = false;
    let orderItems = [];
    
    for (let i = 1; i <= 5; i++) {
        const qtyElement = document.getElementById('qty-' + i);
        const quantity = parseInt(qtyElement.textContent);  // ✅ FIXED: text → textContent
        
        if (quantity > 0) {
            hasItems = true;
            const price = prices[i];
            const total = price * quantity;

            let itemName = "";
            if (i === 1) itemName = "Chicken Burger";
            else if (i === 2) itemName = "Veg Burger";
            else if (i === 3) itemName = "Chicken Pizza";  // ✅ FIXED: was "Chicken Biryani"
            else if (i === 4) itemName = "Chicken Biryani";
            else if (i === 5) itemName = "French Fries";

            orderItems.push({
                name: itemName,
                quantity: quantity,
                price: price,
                total: total
            });
        }
    }
    
    // ---- Step 3: Validate ----
    if (customerName === "") {
        alert("Please enter the customer's name.");
        return;
    }
    
    if (customerPhone === "") {
        alert("Please enter the customer's phone number.");
        return;
    }
    
    if (!hasItems) {
        alert("Please add at least one item to the order.");
        return;
    }
    
    const selectedType = document.querySelector('input[name="orderType"]:checked');
    if (selectedType && selectedType.value === 'delivery' && customerAddress === "") {
        alert("Please enter the delivery address.");
        return;
    }
    
    let orderType = "Dine In";
    if (selectedType) {
        if (selectedType.value === 'takeaway') orderType = "Takeaway";
        else if (selectedType.value === 'delivery') orderType = "Delivery";
    }
    
    let subtotal = 0;
    let orderItemsHTML = "";
    
    for (let item of orderItems) {
        subtotal += item.total;
        orderItemsHTML += `
            <div class="confirmation-line">
                <span>${item.name}</span>
                <span>${item.quantity} × Rs. ${item.price}</span>
                <span>Rs. ${item.total}</span>
            </div>
        `;
    }
    
    const grandTotal = subtotal + deliveryCharge;
    
    const confirmationHTML = `
        <div style="margin-bottom: 15px;">
            <div class="confirmation-line"><strong>Customer:</strong> <span>${customerName}</span></div>
            <div class="confirmation-line"><strong>Phone:</strong> <span>${customerPhone}</span></div>
            ${selectedType && selectedType.value === 'delivery' ? `<div class="confirmation-line"><strong>Address:</strong> <span>${customerAddress}</span></div>` : ''}
            <div class="confirmation-line"><strong>Order Type:</strong> <span>${orderType}</span></div>

        </div>
        <hr>${orderItemsHTML} <hr>
        <div class="confirmation-line"><strong>Subtotal:</strong> <span>Rs. ${subtotal}</span></div>
        <div class="confirmation-line"><strong>Delivery Charge:</strong> <span>Rs. ${deliveryCharge}</span></div>
        <div class="confirmation-line total-line"><strong>TOTAL:</strong> <span>Rs. ${grandTotal}</span></div>
    `;
    
    document.getElementById('confirmation-details').innerHTML = confirmationHTML;
    document.getElementById('order-confirmation').style.display = 'block';
    document.getElementById('order-confirmation').scrollIntoView({ behavior: 'smooth' });
}

function closeConfirmation() {
    document.getElementById('order-confirmation').style.display = 'none';
}
