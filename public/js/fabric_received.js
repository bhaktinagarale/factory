// Show the Add Fabric popup
document.getElementById('addFabricButton').addEventListener('click', function () {
    document.getElementById('addFabricFormContainer').classList.add('active-popup');
});

// Hide the Add Fabric popup
document.getElementById('close-addFabricForm-button').addEventListener('click', function () {
    document.getElementById('addFabricFormContainer').classList.remove('active-popup');
});

// Fetch Styles from Google Sheets and populate the dropdown
async function fetchStyles() {
    try {
        const response = await fetch("/api/products");
        const styles = await response.json();
        const styleSelect = document.getElementById("style");

        styles.forEach(style => {
            const option = document.createElement("option");
           
            option.text = style[1];   // Assuming name or description in second column
            styleSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching styles:", error);
    }
}

// Fetch Suppliers from Google Sheets and populate the dropdown
async function fetchSuppliers() {
    try {
        const response = await fetch("/api/suppliers");
        const suppliers = await response.json();
        const supplierSelect = document.getElementById("supplier");

        suppliers.forEach(supplier => {
            const option = document.createElement("option");
           
            option.text = supplier[1];
            supplierSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching suppliers:", error);
    }
}

// Fetch Customers from Google Sheets and populate the dropdown
async function fetchCustomers() {
    try {
        const response = await fetch("/api/customers");
        const customers = await response.json();
        const customerSelect = document.getElementById("Customer");

        customers.forEach(customer => {
            const option = document.createElement("option");
          
            option.text = customer[1];
            customerSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching customers:", error);
    }
}

// Call the functions to fetch and populate dropdowns on page load
window.onload = async function () {
    await fetchStyles();
    await fetchSuppliers();
    await fetchCustomers();
    fetchFabricEntries();
};

// Function to handle form submission for adding new fabric entry
document.getElementById('addFabricForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get form data
    const fabricData = {
        id: document.getElementById('id').value,
        style: document.getElementById('style').value,
        supplier: document.getElementById('supplier').value,
        customer: document.getElementById('Customer').value,
        fablot: document.getElementById('fablot').value,
        count: document.getElementById('count').value,
        date: document.getElementById('date').value,
    };

    try {
        // Save fabric data to Google Sheets
        const response = await fetch('/api/fabricreceived', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fabricData)
        });

        if (response.ok) {
            // Add the new fabric entry to the table
            addFabricToTable(fabricData);

            // Reset the form and hide popup
            document.getElementById('addFabricForm').reset();
            document.getElementById('addFabricFormContainer').classList.remove('active-popup');
        } else {
            console.error('Error adding fabric:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Function to add a fabric entry to the table dynamically
function addFabricToTable(fabric) {
    const tableBody = document.querySelector('#fabricTable tbody');
    const row = document.createElement('tr');

    // Insert cells into the row
    row.innerHTML = `
        <td>${fabric.id}</td>
        <td>${fabric.style}</td>
        <td>${fabric.supplier}</td>
        <td>${fabric.customer}</td>
        <td>${fabric.fablot}</td>
        <td>${fabric.count}</td>
        <td>${fabric.date}</td>
    `;

    // Append the row to the table
    tableBody.appendChild(row);
}

// Fetch existing fabric entries from Google Sheets and populate the table
async function fetchFabricEntries() {
    try {
        const response = await fetch("/api/fabricreceived");
        const fabrics = await response.json();

        fabrics.forEach(fabric => {
            const fabricData = {
                id: fabric[0],       // Assuming ID is in the first column
                style: fabric[1],    // Assuming Style in the second column
                supplier: fabric[2], // Supplier in the third column
                customer: fabric[3], // Customer in the fourth column
                fablot: fabric[4],   // FabLot in the fifth column
                count: fabric[5],    // Count in the sixth column
                date: fabric[6]      // Date in the seventh column
            };
            addFabricToTable(fabricData);
        });
    } catch (error) {
        console.error("Error fetching fabric entries:", error);
    }
}
