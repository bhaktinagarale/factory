// Function to show the Add Orders popup
document.getElementById('addOrdersButton').addEventListener('click', function () {
    document.getElementById('addordertrsFormContainer').classList.add('active-popup');
});

// Function to hide the Add Orders popup
document.getElementById('close-addOrdersForm-button').addEventListener('click', function () {
    document.getElementById('addordertrsFormContainer').classList.remove('active-popup');
});

// Function to handle form submission
document.getElementById('addOrdertrsForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get form data
    const orderData = {
        Season: document.getElementById('Season').value,
        Style: document.getElementById('Style').value,
        OrderNo: document.getElementById('OrderNo').value,
        Customer: document.getElementById('Customer').value,
        OrderQty: document.getElementById('OrderQty').value,
        ExFacDate: document.getElementById('ExFacDate').value,
        Type: document.getElementById('Type').value,
        Status: document.getElementById('Status').value,
        Owner: document.getElementById('Owner').value
    };

    try {
        // Call the API to save the order data
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            // Add the order data to the table
            addOrderToTable(orderData);

            // Reset the form
            document.getElementById('addOrdertrsForm').reset();

            // Hide the popup
            document.getElementById('addordertrsFormContainer').classList.remove('active-popup');
        } else {
            console.error('Error adding order:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Function to add an order to the table dynamically
function addOrderToTable(order) {
    const tableBody = document.querySelector('#ordertrsTable tbody');
    const row = document.createElement('tr');

    // Insert cells into the row
    row.innerHTML = `
        <td>${order.Season}</td>
        <td>${order.Style}</td>
        <td>${order.OrderNo}</td>
        <td>${order.Customer}</td>
        <td>${order.OrderQty}</td>
        <td>${order.ExFacDate}</td>
        <td>${order.Type}</td>
        <td>${order.Status}</td>
        <td>${order.Owner}</td>
        
    `;

    // Append the row to the table
    tableBody.appendChild(row);
}

// Fetching existing orders from the API and populating the table
async function fetchOrders() {
    try {
        const response = await fetch("/api/orders");
        const orders = await response.json();

        // Clear existing rows
        const tableBody = document.querySelector('#ordertrsTable tbody');
        tableBody.innerHTML = '';

        // Loop through each order and add it to the table
        orders.forEach((order) => {
            const orderData = {
                Season: order[0], // Assuming index 0 is Season
                Style: order[1],  // Assuming index 1 is Style
                OrderNo: order[2], // Assuming index 2 is OrderNo
                Customer: order[3], // Assuming index 3 is Customer
                OrderQty: order[4], // Assuming index 4 is OrderQty
                ExFacDate: order[5], // Assuming index 5 is ExFacDate
                Type: order[6], // Assuming index 6 is Type
                Status: order[7], // Assuming index 7 is Status
                Owner: order[8] // Assuming index 8 is Owner
            };
            addOrderToTable(orderData);
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
    }
}

// Call the fetchOrders function on page load to populate the table
window.onload = fetchOrders;
