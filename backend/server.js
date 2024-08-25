const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'coffee_estate'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});
//***************************USER***************************************** */
// Route to add a new user
app.post('/add-user', (req, res) => {
  const { username, password, role, is_active, email } = req.body;
  const query = 'INSERT INTO users (username, password, role, is_active, email) VALUES (?, ?, ?, ?,?)';
  db.query(query, [username, password, role, is_active, email], (err, result) => {
    if (err) return res.status(500).send('Error adding user.');
    res.send('User added successfully');
  });
});

// Endpoint to get all user details
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving user details:', err);
      return res.status(500).json({ error: 'Failed to retrieve user details' });
    }
    res.json(results);
  });
});

// Endpoint to get user details by user_id
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM users WHERE user_id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error retrieving user details by ID:', err);
      return res.status(500).json({ error: 'Failed to retrieve user details' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(results[0]);
  });
});

// Endpoint to update user details by user_id
app.put('/users/:id', (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const { username, password, role, is_active, email } = req.body;

  const query = `
    UPDATE users 
    SET username = ?, password = ?, role = ?, is_active = ?, email = ?
    WHERE user_id = ?
  `;

  db.query(query, [username, password, role, is_active,email, id], (err, results) => {
    if (err) {
      console.error('Error updating user details:', err);
      return res.status(500).json({ error: 'Failed to update user details' });
    }
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User details updated successfully' });
  });
});



// Endpoint to delete user by user_id
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE user_id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting user by ID:', err);
      return res.status(500).json({ error: 'Failed to delete user' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.send('User deleted successfully');
  });
});


//*****************************ACRE********************* */
// Route to add a new acre
app.post('/add-acre', (req, res) => {
  const { user_id, acre_size, plant_type, terrain, location, water_availability } = req.body;
  const query = 'INSERT INTO Acres (user_id, acre_size, plant_type, terrain, location, water_availability) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [user_id, acre_size, plant_type, terrain, location, water_availability], (err, result) => {
    if (err) return res.status(500).send('Error adding acre.');
    res.send('Acre added successfully');
  });
});

app.get('/acredetails', (req, res) => {
  const query = 'SELECT acre_id, location, acre_size, plant_type, terrain, water_availability FROM acres';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching acre details:', err.stack);
      return res.status(500).json({ error: 'Failed to retrieve acre details' });
    }
    res.json(results);
  });
});

app.get('/acredetails/:id', (req, res) => {
  const { id } = req.params; // Get the acre ID from the request parameters
  const query = 'SELECT acre_id, location, acre_size, plant_type, terrain, water_availability FROM acres WHERE acre_id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching acre details:', err.stack);
      return res.status(500).json({ error: 'Failed to retrieve acre details' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Acre not found' });
    }
    res.json(results[0]); // Return the acre details as a JSON object
  });
});

// Route to update an existing acre
app.put('/update-acre/:id', (req, res) => {
  const { id } = req.params;
  const { user_id, acre_size, plant_type, terrain, location, water_availability } = req.body;
  const query = `
    UPDATE Acres 
    SET user_id = ?, acre_size = ?, plant_type = ?, terrain = ?, location = ?, water_availability = ?
    WHERE acre_id = ?
  `;
  db.query(query, [user_id, acre_size, plant_type, terrain, location, water_availability, id], (err, result) => {
    if (err) return res.status(500).send('Error updating acre.');
    res.send('Acre updated successfully');
  });
});

// Route to delete an existing acre
app.delete('/delete-acre/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Acres WHERE acre_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send('Error deleting acre.');
    res.send('Acre deleted successfully');
  });
});



//***********************************LABOR************************** */
// Route to add a new labor
app.post('/add-labor', (req, res) => {
  const { user_id, name, age, adhar_card, bank_details, health_history, photo, address, emergency_details } = req.body;
  const query = 'INSERT INTO Labors (user_id, name, age, adhar_card, bank_details, health_history, photo, address, emergency_details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [user_id, name, age, adhar_card, bank_details, health_history, photo, address, emergency_details], (err, result) => {
    if (err) return res.status(500).send('Error adding labor.');
    res.send('Labor added successfully');
  });
});


// Endpoint to get all labor details
app.get('/labors', (req, res) => {
  const query = 'SELECT * FROM Labors';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving labor details:', err.stack);
      return res.status(500).json({ error: 'Failed to retrieve labor details' });
    }
    res.json(results);
  });
});

// Endpoint to get labor details by ID
app.get('/labor/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM Labors WHERE labor_id = ?'; // Adjust column name if necessary

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error retrieving labor details:', err.stack);
      return res.status(500).json({ error: 'Failed to retrieve labor details' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Labor not found' });
    }
    res.json(results[0]);
  });
});


//*************************FERTILIZER************************ */
// Route to add a new fertilizer
app.post('/add-fertilizer', (req, res) => {
  const { acre_id, fertilizer_name, date_of_application } = req.body;
  const query = 'INSERT INTO Fertilizers (acre_id, fertilizer_name, date_of_application) VALUES (?, ?, ?)';
  db.query(query, [acre_id, fertilizer_name, date_of_application], (err, result) => {
    if (err) return res.status(500).send('Error adding fertilizer.');
    res.send('Fertilizer added successfully');
  });
});

// Endpoint to get all fertilizer details
app.get('/fertilizerdetails', (req, res) => {
  const query = 'SELECT * FROM fertilizers';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving fertilizer details:', err);
      return res.status(500).json({ error: 'Failed to retrieve fertilizer details' });
    }
    res.json(results);
  });
});

// Route to add rain details
app.post('/add-rain', (req, res) => {
  const { acre_id, date_time, rain_amount } = req.body;
  const query = 'INSERT INTO RainDetails (acre_id, date_time, rain_amount) VALUES (?, ?, ?)';
  db.query(query, [acre_id, date_time, rain_amount], (err, result) => {
    if (err) return res.status(500).send('Error adding rain details.');
    res.send('Rain details added successfully');
  });
});

app.get('/raindetails', (req, res) => {
  const query = 'SELECT * FROM raindetails';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching rain details:', err);
      res.status(500).send('Error fetching rain details.');
    } else {
      res.json(results);
    }
  });
});


app.put('/raindetails/:id', (req, res) => {
  const { id } = req.params;
  const { acre_id, date_time, rain_amount } = req.body;

  const query = `UPDATE raindetails 
                 SET acre_id = ?, date_time = ?, rain_amount = ? 
                 WHERE rain_id = ?`;

  db.query(query, [acre_id, date_time, rain_amount, id], (err, result) => {
    if (err) {
      console.error('Error updating rain details:', err);
      res.status(500).send('Error updating rain details.');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Rain detail not found.');
    } else {
      res.send('Rain details updated successfully.');
    }
  });
});


app.delete('/raindetails/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM raindetails WHERE rain_id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting rain details:', err);
      res.status(500).send('Error deleting rain details.');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Rain detail not found.');
    } else {
      res.send('Rain details deleted successfully.');
    }
  });
});

//********************************REPORT********************** */
app.post('/add-report', (req, res) => {
  // Extract report details from request body
  const { acre_id, total_expenditure, total_revenue, profit_loss } = req.body;

  // SQL query to insert a new report
  const query = `INSERT INTO Reports (acre_id, total_expenditure, total_revenue, profit_loss) VALUES (?, ?, ?, ?)`;

  // Execute the SQL query
  db.query(query, [acre_id, total_expenditure, total_revenue, profit_loss], (err, result) => {
    if (err) {
      // Log the error and send a 500 response if there's an issue with the query
      console.error('Error adding report:', err);
      res.status(500).send('Error adding report.');
    } else {
      // Send a success message
      res.send('Report added successfully.');
    }
  });
});


// Route to generate a summary report
app.get('/report/:acre_id', (req, res) => {
  const acre_id = req.params.acre_id;
  const query = `
    SELECT
      (SELECT SUM(water + fertilizer + pruning + others) FROM Expenditure WHERE acre_id = ?) AS total_expenditure,
      (SELECT SUM(selling_price) FROM CropDetails WHERE acre_id = ?) AS total_revenue,
      (SELECT (SUM(selling_price) - SUM(water + fertilizer + pruning + others)) FROM CropDetails INNER JOIN Expenditure ON CropDetails.acre_id = Expenditure.acre_id WHERE CropDetails.acre_id = ?) AS profit_loss
  `;
  db.query(query, [acre_id, acre_id, acre_id], (err, result) => {
    if (err) return res.status(500).send('Error generating report.');
    res.json(result[0]);
  });
});

app.get('/reportdetails/:id', (req, res) => {
  const reportId = req.params.id;
  const query = 'SELECT * FROM Reports WHERE report_id = ?';

  db.query(query, [reportId], (err, results) => {
    if (err) {
      console.error('Error fetching report details:', err);
      res.status(500).send('Error fetching report details.');
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).send('Report not found.');
      }
    }
  });
});


app.put('/reportdetails/:id', (req, res) => {
  const reportId = req.params.id;
  const { acre_id, total_expenditure, total_revenue, profit_loss } = req.body;
  const query = `
    UPDATE Reports
    SET acre_id = ?, total_expenditure = ?, total_revenue = ?, profit_loss = ?
    WHERE report_id = ?
  `;

  db.query(query, [acre_id, total_expenditure, total_revenue, profit_loss, reportId], (err, result) => {
    if (err) {
      console.error('Error updating report details:', err);
      res.status(500).send('Error updating report details.');
    } else {
      if (result.affectedRows > 0) {
        res.send('Report updated successfully.');
      } else {
        res.status(404).send('Report not found.');
      }
    }
  });
});


app.delete('/reportdetails/:id', (req, res) => {
  const reportId = req.params.id;
  const query = 'DELETE FROM Reports WHERE report_id = ?';

  db.query(query, [reportId], (err, result) => {
    if (err) {
      console.error('Error deleting report details:', err);
      res.status(500).send('Error deleting report details.');
    } else {
      if (result.affectedRows > 0) {
        res.send('Report deleted successfully.');
      } else {
        res.status(404).send('Report not found.');
      }
    }
  });
});


// Assuming you have an Express app setup
app.get('/reportdetails', (req, res) => {
  // SQL query to select all reports
  const query = 'SELECT * FROM Reports';

  // Execute the SQL query
  db.query(query, (err, results) => {
    if (err) {
      // Log the error and send a 500 response if there's an issue with the query
      console.error('Error fetching report details:', err);
      res.status(500).send('Error fetching report details.');
    } else {
      // Send the list of reports as a JSON response
      res.json(results);
    }
  });
});


// ************************ Plant ****************************

// Endpoint to add a new plant detail
app.post('/add-plantdetail', (req, res) => {
  const { acre_id, plant_type, details } = req.body;
  const query = 'INSERT INTO plantdetails (acre_id, plant_type, details) VALUES (?, ?, ?)';
  db.query(query, [acre_id, plant_type, details], (err, result) => {
    if (err) return res.status(500).send('Error adding plant detail.');
    res.send('Plant detail added successfully.');
  });
});

// Endpoint to get all plant details
app.get('/plantdetails', (req, res) => {
  const query = 'SELECT * FROM plantdetails';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send('Error retrieving plant details.');
    res.json(results);
  });
});

// Endpoint to update a plant detail by plant_id
app.put('/update-plantdetail/:plant_id', (req, res) => {
  const { plant_id } = req.params;
  const { acre_id, plant_type, details } = req.body;
  const query = `
    UPDATE plantdetails 
    SET acre_id = ?, plant_type = ?, details = ?
    WHERE plant_id = ?
  `;
  db.query(query, [acre_id, plant_type, details, plant_id], (err, result) => {
    if (err) return res.status(500).send('Error updating plant detail.');
    res.send('Plant detail updated successfully.');
  });
});

// Endpoint to delete a plant detail by plant_id
app.delete('/delete-plantdetail/:plant_id', (req, res) => {
  const { plant_id } = req.params;
  const query = 'DELETE FROM plantdetails WHERE plant_id = ?';
  db.query(query, [plant_id], (err, result) => {
    if (err) return res.status(500).send('Error deleting plant detail.');
    res.send('Plant detail deleted successfully.');
  });
});

// ********** Crop Details ****************/

// Endpoint to add a new crop detail
app.post('/add-cropdetail', (req, res) => {
  const { acre_id, yield_obtained, selling_price } = req.body;
  const query = 'INSERT INTO CropDetails (acre_id, yield_obtained, selling_price) VALUES (?, ?, ?)';
  db.query(query, [acre_id, yield_obtained, selling_price], (err, result) => {
    if (err) return res.status(500).send('Error adding crop detail.');
    res.send('Crop detail added successfully.');
  });
});

// Endpoint to get all crop details
app.get('/cropdetails', (req, res) => {
  const query = 'SELECT * FROM cropdetails';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send('Error retrieving crop details.');
    res.json(results);
  });
});

// Endpoint to update a crop detail by crop_id
app.put('/update-cropdetail/:crop_id', (req, res) => {
  const { crop_id } = req.params;
  const { acre_id, yield_obtained, selling_price } = req.body;
  const query = `
    UPDATE CropDetails 
    SET acre_id = ?, yield_obtained = ?, selling_price = ?
    WHERE crop_id = ?
  `;
  db.query(query, [acre_id, yield_obtained, selling_price, crop_id], (err, result) => {
    if (err) return res.status(500).send('Error updating crop detail.');
    res.send('Crop detail updated successfully.');
  });
});

// Endpoint to delete a crop detail by crop_id
app.delete('/delete-cropdetail/:crop_id', (req, res) => {
  const { crop_id } = req.params;
  const query = 'DELETE FROM CropDetails WHERE crop_id = ?';
  db.query(query, [crop_id], (err, result) => {
    if (err) return res.status(500).send('Error deleting crop detail.');
    res.send('Crop detail deleted successfully.');
  });
});

//*******************EXP******************************* */
app.post('/add-expenditure', (req, res) => {
  const { acre_id, water, fertilizer, pruning, others } = req.body;
  const query = `INSERT INTO Expenditure (acre_id, water, fertilizer, pruning, others) VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [acre_id, water, fertilizer, pruning, others], (err, result) => {
    if (err) {
      console.error('Error adding expenditure details:', err);
      res.status(500).send('Error adding expenditure details.');
    } else {
      res.send('Expenditure details added successfully.');
    }
  });
});

app.get('/expendituredetails', (req, res) => {
  const query = 'SELECT * FROM Expenditure';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching expenditure details:', err);
      res.status(500).send('Error fetching expenditure details.');
    } else {
      res.json(result); // Send the result as a JSON array
    }
  });
});


app.get('/expendituredetails/:id', (req, res) => {
  const expenditure_id = parseInt(req.params.id, 10);
  const query = 'SELECT * FROM Expenditure WHERE expenditure_id = ?';

  db.query(query, [expenditure_id], (err, result) => {
    if (err) {
      console.error('Error fetching expenditure details:', err);
      res.status(500).send('Error fetching expenditure details.');
    } else if (result.length === 0) {
      res.status(404).send('Expenditure details not found.');
    } else {
      res.json(result[0]); // Send the first matching result
    }
  });
});

app.put('/update-expenditure/:id', (req, res) => {
  const { id } = req.params;
  const { water, fertilizer, pruning, others } = req.body;
  
  const query = `
    UPDATE Expenditure
    SET water = ?, fertilizer = ?, pruning = ?, others = ?
    WHERE expenditure_id = ?
  `;
  
  db.query(query, [water, fertilizer, pruning, others, id], (err, result) => {
    if (err) {
      console.error('Error updating expenditure details:', err);
      res.status(500).send('Error updating expenditure details.');
    } else {
      res.send('Expenditure details updated successfully.');
    }
  });
});


app.delete('/delete-expenditure/:id', (req, res) => {
  const { id } = req.params;
  
  const query = 'DELETE FROM Expenditure WHERE expenditure_id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting expenditure details:', err);
      res.status(500).send('Error deleting expenditure details.');
    } else {
      res.send('Expenditure details deleted successfully.');
    }
  });
});



// ************ Fertilizer ****************************/

// Endpoint to add a new fertilizer
app.post('/add-fertilizer', (req, res) => {
  const { acre_id, fertilizer_name, date_of_application } = req.body;
  const query = 'INSERT INTO Fertilizers (acre_id, fertilizer_name, date_of_application) VALUES (?, ?, ?)';
  db.query(query, [acre_id, fertilizer_name, date_of_application], (err, result) => {
    if (err) return res.status(500).send('Error adding fertilizer.');
    res.send('Fertilizer added successfully.');
  });
});

// Endpoint to get all fertilizers
app.get('/fertilizers', (req, res) => {
  const query = 'SELECT * FROM Fertilizers';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send('Error retrieving fertilizers.');
    res.json(results);
  });
});

// Endpoint to update a fertilizer by fertilizer_id
app.put('/update-fertilizer/:fertilizer_id', (req, res) => {
  const { fertilizer_id } = req.params;
  const { acre_id, fertilizer_name, date_of_application } = req.body;
  const query = `
    UPDATE Fertilizers 
    SET acre_id = ?, fertilizer_name = ?, date_of_application = ?
    WHERE fertilizer_id = ?
  `;
  db.query(query, [acre_id, fertilizer_name, date_of_application, fertilizer_id], (err, result) => {
    if (err) return res.status(500).send('Error updating fertilizer.');
    res.send('Fertilizer updated successfully.');
  });
});

// Endpoint to delete a fertilizer by fertilizer_id
app.delete('/delete-fertilizer/:fertilizer_id', (req, res) => {
  const { fertilizer_id } = req.params;
  const query = 'DELETE FROM Fertilizers WHERE fertilizer_id = ?';
  db.query(query, [fertilizer_id], (err, result) => {
    if (err) return res.status(500).send('Error deleting fertilizer.');
    res.send('Fertilizer deleted successfully.');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
