// Function to show the Add Pre-Production Tracking popup
document.getElementById('addPptrackingButton').addEventListener('click', function () {
    document.getElementById('addPptrackingFormContainer').classList.add('active-popup');
});

// Function to hide the Add Pre-Production Tracking popup
document.getElementById('close-addPptrackingForm-button').addEventListener('click', function () {
    document.getElementById('addPptrackingFormContainer').classList.remove('active-popup');
});

// Function to handle form submission
document.getElementById('addPptrackingForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get form data
    const formData = {
        season: document.getElementById('season').value,
        style: document.getElementById('style').value,
        orderNo: document.getElementById('orderNo').value,
        buyer: document.getElementById('buyer').value,
        qty: document.getElementById('qty').value,
        ExFactryDate: document.getElementById('ExFactryDate').value,
        OrdRcvd: document.getElementById('OrdRcvd').value,
        BomGen: document.getElementById('BomGen').value,
        SizeSetApp: document.getElementById('SizeSetApp').value,
        PPSmplCmp: document.getElementById('PPSmplCmp').value,
        PPSmplApp: document.getElementById('PPSmplApp').value,
        FebOrd: document.getElementById('FebOrd').value,
        TrimsRcvd: document.getElementById('TrimsRcvd').value,
        PPMeeting: document.getElementById('PPMeeting').value
    };

    try {
        // Call the API to save data
        const response = await fetch('/api/pptracking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Add the new data to the table
            addPptrackingToTable(formData);

            // Reset the form
            document.getElementById('addPptrackingForm').reset();

            // Hide the popup
            document.getElementById('addPptrackingFormContainer').classList.remove('active-popup');
        } else {
            console.error('Error adding Pre-Production Tracking:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Function to add a row dynamically to the Pre-Production Tracking table
function addPptrackingToTable(data) {
    const tableBody = document.querySelector('#pptrackingTable tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${data.season}</td>
        <td>${data.style}</td>
        <td>${data.orderNo}</td>
        <td>${data.buyer}</td>
        <td>${data.qty}</td>
        <td>${data.ExFactryDate}</td>
        <td>${data.OrdRcvd}</td>
        <td>${data.BomGen}</td>
        <td>${data.SizeSetApp}</td>
        <td>${data.PPSmplCmp}</td>
        <td>${data.PPSmplApp}</td>
        <td>${data.FebOrd}</td>
        <td>${data.TrimsRcvd}</td>
        <td>${data.PPMeeting}</td>
    `;

    tableBody.appendChild(row);
}

// Fetch existing Pre-Production Tracking records and populate the table
async function fetchPptrackingRecords() {
    try {
        const response = await fetch('/api/pptracking');
        const records = await response.json();

        records.forEach((record) => {
            const data = {
                season: record[0],
                style: record[1],
                orderNo: record[2],
                buyer: record[3],
                qty: record[4],
                ExFactryDate: record[5],
                OrdRcvd: record[6],
                BomGen: record[7],
                SizeSetApp: record[8],
                PPSmplCmp: record[9],
                PPSmplApp: record[10],
                FebOrd: record[11],
                TrimsRcvd: record[12],
                PPMeeting: record[13]
            };

            addPptrackingToTable(data);
        });
    } catch (error) {
        console.error('Error fetching Pre-Production Tracking records:', error);
    }
}

// Call the function to populate the table on page load
window.onload = fetchPptrackingRecords;
