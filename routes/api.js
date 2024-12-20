const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const fs = require("fs");

//now Load Google Sheets credentials
const credentials = JSON.parse(fs.readFileSync("credentials/credentials.json"));
//const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
const { client_email, private_key } = credentials;
const scopes = ["https://www.googleapis.com/auth/spreadsheets"];
//const response = await fetch('https://factorys.blr1.digitaloceanspaces.com/credentials.json');
//const credentials = await response.json();

 

//const client_email = process.env.client_email;
//const private_key = process.env.private_key;
const auth = new google.auth.JWT(client_email, null, private_key, scopes);
const sheets = google.sheets({ version: "v4", auth });

const spreadsheetId = "1S1YyDtB4MwT7b26w5jN4rjyRvlW0vbAJoKD5D0nRQnI";


// GET all employees from the Google Sheet
router.get("/employees", async (req, res) => {
  try {
    const range = "Sheet1!A2:F"; // Adjust range if needed
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const rows = response.data.values;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching employees" });

  }
});

//GET all departments from the Goole Sheet
router.get("/departments", async (req, res) => {
  try {
    const range = "Sheet2!A2:B";
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const rows = response.data.values;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching departments" });

  }
});

//GET customes from google sheet
router.get("/customers", async (req, res) => {
  try {
    const range = "Sheet3!A2:C";
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const rows = response.data.values;
    res.json(rows);
  } catch (err) {
    console.error("Google Sheets API Error:", error.message);
  }
});

//GET suppliers from google sheet
router.get("/suppliers", async (req, res) => {
  try {
    const range = "Sheet4!A2:C";
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const rows = response.data.values;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching suppliers" });

  }
});

//GET products/style from google sheet
router.get("/products", async (req, res) => {
  try {
    const range = "Sheet5!A2:D";
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const rows = response.data.values;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching products" });

  }
});

//Get workstation from google sheet
router.get("/workstations", async (req, res) => {
  try {
    const range = "workstation!A2:D";
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const rows = response.data.values;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching workstations" });

  }
});

//Get fabric from google sheet
router.get("/fabricreceived", async (req, res) => {
  try {
    const range = "fabricreceived!A2:G";
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const rows = response.data.values;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching fabric" });

  }
});

//Get PPTracking from google sheet
router.get("/pptracking", async (req, res) => {
  try {
    const range = "pptracking!A2:N";
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const rows = response.data.values;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error PPTracking" });

  }
});

// // //Get milestone from google sheet
// router.get("/milestone", async (req, res) => {
//    try {
//      const range = "milestone!A2";
//      const response = await sheets.spreadsheets.values.get({
//        spreadsheetId,
//        range,
//      });
//      const rows = response.data.values;
//      res.json(rows);
//    } catch (err) {
//      res.status(500).json({ error: "Error milestone" });

//    }
//  });

//Get orders from google sheet
router.get("/orders", async (req, res) => {
  try {
    const range = "orders!A2:I";
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const rows = response.data.values;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error orders" });

  }
});


// //Get ordertracking from google sheet
// router.get("/ordertracking", async (req, res) => {
//     try {
//   const range = "ordertracking!A2:B";
//     const response = await sheets.spreadsheets.values.get({
//        spreadsheetId,
//     range,
//      });
//  const rows = response.data.values;
//    res.json(rows);
//   } catch (err) {   res.status(500).json({ error: "Error ordertracking" });
//   }
//  });

// POST to add a new employee to Google Sheets
router.post("/employees", async (req, res) => {
  const { id, name, department, joiningDate, salary, email } = req.body;
  try {
    const values = [[id, name, department, joiningDate, salary, email]];
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:F", // Adjust range if needed
      valueInputOption: "RAW",
      resource: { values },
    });
    res.status(201).send("Employee added");
  } catch (err) {
    res.status(500).send("Error adding employee");
  }
});

// PUT to update an employee's data in Google Sheets
router.put("/employees/:rowIndex", async (req, res) => {
  const { rowIndex } = req.params;
  const { id, name, department, joiningDate, salary, email } = req.body;
  try {
    const values = [[id, name, department, joiningDate, salary, email]];
    const range = `Sheet1!A${parseInt(rowIndex) + 2}:F${parseInt(rowIndex) + 2
      }`; // Add 2 to account for header row
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      resource: { values },
    });
    res.send("Employee updated");
  } catch (err) {
    res.status(500).send("Error updating employee");
  }
});




// DELETE an employee from Google Sheets by clearing the row
router.delete("/employees/:rowIndex", async (req, res) => {
  const { rowIndex } = req.params;
  try {
    const request = {
      spreadsheetId,
      resource: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0,
                dimension: "ROWS",
                startIndex: parseInt(rowIndex) + 1,
                endIndex: parseInt(rowIndex) + 2,
              },
            },
          },
        ],
      },
    };



    // Send batchUpdate request to delete the row
    await sheets.spreadsheets.batchUpdate(request);

    res.send("Employee row deleted");
  } catch (err) {
    console.error("Error deleting employee row:", err);
    res.status(500).send("Error deleting employee row");
  }
});

//POST customers data in google sheet
router.post('/customers', async (req, res) => {
  const { id, name, buyingDate } = req.body;
  try {

    const values = [[id, name, buyingDate]];
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet3!A2:C", //Adjust range if needed
      valueInputOption: "RAW",
      resource: { values },
    });
    res.status(201).send("Customer added successfully");
  } catch (err) {
    res.status(500).send("Error adding customer to Google Sheets");
  }
});

//POST suppliers data in google sheet
router.post('/suppliers', async (req, res) => {
  const { id, name, date } = req.body;
  try {
    const values = [[id, name, date]];
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet4!A2:C", //Adjust range if needed
      valueInputOption: "RAW",
      resource: { values },
    });
    res.status(201).send("Supplier added successfully");
  } catch (err) {
    res.status(500).send("Error adding customer to Google Sheets");
  }
});

// POST products to Google Sheets
router.post('/products', async (req, res) => {
  const { id, name, bname, deliveryDate } = req.body;
  
  try {
    const values = [[id, name, bname, deliveryDate]]; // Create a row array
      await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: "Sheet5!A2:D", // Specify the starting point for appending data
          valueInputOption: "RAW",
          resource: { values },
      });
      res.status(201).send("Product added successfully");
  } catch (err) {
      
      res.status(500).send("Error adding product to Google Sheets");
  }
});

// POST workstation to Google Sheets
router.post('/workstations', async (req, res) => {
  const { id, name, dname, sname } = req.body; // Extract workstation data from the request body

  try {
    const values = [[id, name, dname, sname]]; // Create an array for the row data
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "workstation!A2:D", // Specify the starting range for appending data
      valueInputOption: "RAW",
      resource: { values },
    });
    res.status(201).send("Workstation added successfully");
  } catch (err) {

    res.status(500).send("Error adding workstation to Google Sheets");
  }
});



// POST fabric to Google Sheets
router.post('/fabricreceived', async (req, res) => {
  const { id, style, supplier, customer, fablot,count,date } = req.body; // Extract workstation data from the request body

  try {
    const values = [[id, style, supplier, customer, fablot,count,date]]; // Create an array for the row data
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "fabricreceived!A2:G", // Specify the starting range for appending data
      valueInputOption: "RAW",
      resource: { values },
    });
    res.status(201).send("fabric added successfully");
  } catch (err) {

    res.status(500).send("Error adding fabric to Google Sheets");
  }
});

// POST order to Google Sheets
router.post('/orders', async (req, res) => {
  const { Season, Style, OrderNo, Customer, OrderQty, ExFacDate, Type, Status, Owner } = req.body; // Extract order data

  try {
      // Prepare the row data
      const values = [[Season, Style, OrderNo, Customer, OrderQty, ExFacDate, Type, Status, Owner]];

      // Append data to the Google Sheet
      await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: "orders!A2:I", // Specify the range where data should be appended
          valueInputOption: "RAW",
          resource: { values },
      });

      // Respond with success
      res.status(201).send("Order added successfully");
  } catch (err) {
      console.error("Error adding order to Google Sheets:", err);
      res.status(500).send("Error adding order to Google Sheets");
  }
});



module.exports = router;
