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
  const { username, password, role, is_active, email, created_by } = req.body;
  const created_on = new Date();
  const query = `
    INSERT INTO users (username, password, role, is_active, email, created_on, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [username, password, role, is_active, email, created_on, created_by], (err, result) => {
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
  const { id } = req.params;
  const { username, password, role, is_active, email, modified_by } = req.body;
  const modified_on = new Date();

  const query = `
    UPDATE users 
    SET username = ?, password = ?, role = ?, is_active = ?, email = ?, modified_on = ?, modified_by = ?
    WHERE user_id = ?
  `;

  db.query(query, [username, password, role, is_active, email, modified_on, modified_by, id], (err, results) => {
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
  const { user_id, acre_size, plant_type, terrain, location, water_availability, property_id, created_by } = req.body;
  const created_on = new Date(); // Set the creation date to the current date and time
  const query = `
    INSERT INTO Acres (user_id, acre_size, plant_type, terrain, location, water_availability, property_id, created_on, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [user_id, acre_size, plant_type, terrain, location, water_availability, property_id, created_on, created_by], (err, result) => {
    if (err) return res.status(500).send('Error adding acre.');
    res.send('Acre added successfully');
  });
});

// Route to get all acre details
app.get('/acredetails', (req, res) => {
  const query = `
    SELECT acre_id, user_id, acre_size, plant_type, terrain, location, water_availability, property_id, created_on, created_by, modified_on, modified_by
    FROM Acres
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching acre details:', err.stack);
      return res.status(500).json({ error: 'Failed to retrieve acre details' });
    }
    res.json(results);
  });
});


// Route to get all acre details by userid
app.get('/acredetailsbyuserid/:userId', (req, res) => {
  const { userId } = req.params; // Get the acre ID from the request parameters
  console.log(userId);
  const query = `
    SELECT acre_id, user_id, acre_size, plant_type, terrain, location, water_availability, property_id, created_on, created_by, modified_on, modified_by
    FROM Acres where user_id = ?
  `;

  db.query(query,[userId], (err, results) => {
    if (err) {
      console.error('Error fetching acre details:', err.stack);
      return res.status(500).json({ error: 'Failed to retrieve acre details' });
    }
    res.json(results);
  });
});
// Route to get acre details by acre_id
app.get('/acredetails/:id', (req, res) => {
  const { id } = req.params; // Get the acre ID from the request parameters
  const query = `
    SELECT acre_id, user_id, acre_size, plant_type, terrain, location, water_availability, property_id, created_on, created_by, modified_on, modified_by
    FROM Acres 
    WHERE acre_id = ?
  `;

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
  const { user_id, acre_size, plant_type, terrain, location, water_availability, property_id, modified_by } = req.body;
  const modified_on = new Date(); // Set the modification date to the current date and time

  const query = `
    UPDATE Acres 
    SET user_id = ?, acre_size = ?, plant_type = ?, terrain = ?, location = ?, water_availability = ?, property_id = ?, modified_on = ?, modified_by = ?
    WHERE acre_id = ?
  `;
  db.query(query, [user_id, acre_size, plant_type, terrain, location, water_availability, property_id, modified_on, modified_by, id], (err, result) => {
    if (err) return res.status(500).send('Error updating acre.');
    if (result.affectedRows === 0) return res.status(404).send('Acre not found.');
    res.send('Acre updated successfully');
  });
});

// Route to delete an existing acre
app.delete('/delete-acre/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Acres WHERE acre_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send('Error deleting acre.');
    if (result.affectedRows === 0) return res.status(404).send('Acre not found.');
    res.send('Acre deleted successfully');
  });
});



//***********************************LABOUR************************** */

// Route to add a new labor
app.post('/add-labor', (req, res) => {
  const { user_id, name, age, adhar_card, bank_details, health_history, photo, address, emergency_details, created_by } = req.body;
  const created_on = new Date(); // Set the creation date to the current date and time
  const query = `
    INSERT INTO Labors (user_id, name, age, adhar_card, bank_details, health_history, photo, address, emergency_details, created_on, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [user_id, name, age, adhar_card, bank_details, health_history, photo, address, emergency_details, created_on, created_by], (err, result) => {
    if (err) return res.status(500).send('Error adding labor.');
    res.send('Labor added successfully');
  });
});

// Endpoint to get all labor details
app.get('/labors', (req, res) => {
  const query = `
    SELECT labor_id, user_id, name, age, adhar_card, bank_details, health_history, photo, address, emergency_details, created_on, created_by, modified_on, modified_by
    FROM Labors
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving labor details:', err.stack);
      return res.status(500).json({ error: 'Failed to retrieve labor details' });
    }
    res.json(results);
  });
});

// Endpoint to get labor details by property_id
app.get('/labors-prop/:property_id', (req, res) => {
  const propertyId = req.params.property_id; // Get the property_id from the request parameters

  const query = `
    SELECT l.labor_id, l.user_id, l.name, l.age, l.adhar_card, l.bank_details, l.health_history, l.photo, l.address, l.emergency_details, l.created_on, l.created_by, l.modified_on, l.modified_by
    FROM Labors l
    JOIN propertylabor pl ON l.labor_id = pl.labor_id
    WHERE pl.proper_id = ?
  `;

  db.query(query, [propertyId], (err, results) => {
    if (err) {
      console.error('Error retrieving labor details for property_id:', err.stack);
      return res.status(500).json({ error: 'Failed to retrieve labor details' });
    }
    res.json(results);
  });
});


// Endpoint to get labor details by labor_id
app.get('/labor/:id', (req, res) => {
  const { id } = req.params; // Get the labor ID from the request parameters
  const query = `
    SELECT labor_id, user_id, name, age, adhar_card, bank_details, health_history, photo, address, emergency_details, created_on, created_by, modified_on, modified_by
    FROM Labors 
    WHERE labor_id = ?
  `;

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

// Endpoint to update labor details by labor_id
app.put('/labors/:id', (req, res) => {
  const { id } = req.params;
  const {
    name,
    age,
    adhar_card,
    bank_details,
    health_history,
    photo,
    address,
    emergency_details,
    modified_by
  } = req.body;
  const modified_on = new Date(); // Set the modification date to the current date and time

  const query = `
    UPDATE Labors 
    SET 
      name = ?, 
      age = ?, 
      adhar_card = ?, 
      bank_details = ?, 
      health_history = ?, 
      photo = ?, 
      address = ?, 
      emergency_details = ?, 
      modified_on = ?, 
      modified_by = ?
    WHERE labor_id = ?
  `;

  db.query(
    query,
    [
      name,
      age,
      adhar_card,
      bank_details,
      health_history,
      photo,
      address,
      emergency_details,
      modified_on,
      modified_by,
      id
    ],
    (err, result) => {
      if (err) {
        console.error('Error updating labor details:', err);
        return res.status(500).json({ error: 'Failed to update labor details' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Labor not found' });
      }
      res.json({ message: 'Labor details updated successfully' });
    }
  );
});

// Route to delete an existing labor
app.delete('/labors/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Labors WHERE labor_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send('Error deleting labor.');
    if (result.affectedRows === 0) return res.status(404).send('Labor not found.');
    res.send('Labor deleted successfully');
  });
});

//***************************RAIN DETAILS***************************************** */

// Route to add rain details
app.post('/add-rain', (req, res) => {
  const { acre_id, date_time, rain_amount, block_id, created_by } = req.body;
  const created_on = new Date(); // Set the creation date to the current date and time
  const query = `
    INSERT INTO RainDetails (acre_id, date_time, rain_amount, block_id, created_on, created_by) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [acre_id, date_time, rain_amount, block_id, created_on, created_by], (err, result) => {
    if (err) return res.status(500).send('Error adding rain details.');
    res.send('Rain details added successfully.');
  });
});

// Route to get all rain details
app.get('/raindetails', (req, res) => {
  const query = `
    SELECT rain_id, date_time, rain_amount, block_id, created_on, created_by, modified_on, modified_by 
    FROM RainDetails
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching rain details:', err);
      return res.status(500).send('Error fetching rain details.');
    } else {
      res.json(results);
    }
  });
});


// Route to get all rain details
app.get('/raindetails-prop/:property_id', (req, res) => {
  const { property_id } = req.params;
  const query = `
   select r.rain_id, r.rain_amount, r.date_time, r.block_id, b.block_name, r.created_by, r.created_on,
r.modified_by, r.modified_on from  raindetails r inner join blocks b on r.block_id= b.block_id
inner join property p on p.property_id = b.property_id where p.property_id =?
  `;
  db.query(query, [property_id],(err, results) => {
    if (err) {
      console.error('Error fetching rain details:', err);
      return res.status(500).send('Error fetching rain details.');
    } else {
      res.json(results);
    }
  });2
});

// Route to get a specific rain detail by rain_id
app.get('/raindetails/:id', (req, res) => {
  const rain_id = parseInt(req.params.id, 10);
  const query = `
    SELECT rain_id, date_time, rain_amount, block_id, created_on, created_by, modified_on, modified_by 
    FROM RainDetails 
    WHERE rain_id = ?
  `;
  db.query(query, [rain_id], (err, result) => {
    if (err) {
      console.error('Error fetching rain detail:', err);
      return res.status(500).send('Error fetching rain detail.');
    } else if (result.length === 0) {
      return res.status(404).send('Rain detail not found.');
    } else {
      res.json(result[0]);
    }
  });
});

// Route to update a rain detail by rain_id
app.put('/update-rain/:id', (req, res) => {
  const { id } = req.params;
  const { date_time, rain_amount, block_id, modified_by } = req.body;
  const modified_on = new Date(); // Set the modification date to the current date and time
  const query = `
    UPDATE RainDetails 
    SET date_time = ?, rain_amount = ?, block_id = ?, modified_on = ?, modified_by = ?
    WHERE rain_id = ?
  `;
  db.query(query, [date_time, rain_amount, block_id, modified_on, modified_by, id], (err, result) => {
    if (err) return res.status(500).send('Error updating rain detail. error: '+ err);
    if (result.affectedRows === 0) {
      return res.status(404).send('Rain detail not found.');
    }
    res.send('Rain detail updated successfully.');
  });
});

// Route to delete a rain detail by rain_id
app.delete('/delete-rain/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM RainDetails WHERE rain_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send('Error deleting rain detail.');
    if (result.affectedRows === 0) {
      return res.status(404).send('Rain detail not found.');
    }
    res.send('Rain detail deleted successfully.');
  });
});

//********************************REPORT********************** */
// Route to add a new report
app.post('/add-report', (req, res) => {
  // Extract report details from request body
  const { acre_id, total_expenditure, total_revenue, profit_loss, property_id, created_by } = req.body;
  
  // Set the current date and time for created_on
  const created_on = new Date();

  // SQL query to insert a new report
  const query = `
    INSERT INTO Reports (acre_id, total_expenditure, total_revenue, profit_loss, property_id, created_on, created_by) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  // Execute the SQL query
  db.query(query, [acre_id, total_expenditure, total_revenue, profit_loss, property_id, created_on, created_by], (err, result) => {
    if (err) {
      // Log the error and send a 500 response if there's an issue with the query
      console.error('Error adding report:', err);
      return res.status(500).send('Error adding report.');
    } else {
      // Send a success message
      res.send('Report added successfully.');
    }
  });
});

// Route to generate a summary report for a specific acre
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

// Route to get report details by report_id
app.get('/reportdetails/:id', (req, res) => {
  const reportId = req.params.id;
  const query = `
    SELECT * FROM Reports WHERE report_id = ?
  `;

  db.query(query, [reportId], (err, results) => {
    if (err) {
      console.error('Error fetching report details:', err);
      return res.status(500).send('Error fetching report details.');
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).send('Report not found.');
      }
    }
  });
});

// Route to update report details by report_id
app.put('/reportdetails/:id', (req, res) => {
  const reportId = req.params.id;
  const { acre_id, total_expenditure, total_revenue, profit_loss, property_id, modified_by } = req.body;
  
  // Set the current date and time for modified_on
  const modified_on = new Date();

  const query = `
    UPDATE Reports
    SET acre_id = ?, total_expenditure = ?, total_revenue = ?, profit_loss = ?, property_id = ?, modified_on = ?, modified_by = ?
    WHERE report_id = ?
  `;

  db.query(query, [acre_id, total_expenditure, total_revenue, profit_loss, property_id, modified_on, modified_by, reportId], (err, result) => {
    if (err) {
      console.error('Error updating report details:', err);
      return res.status(500).send('Error updating report details.');
    } else {
      if (result.affectedRows > 0) {
        res.send('Report updated successfully.');
      } else {
        res.status(404).send('Report not found.');
      }
    }
  });
});

// Route to delete a report by report_id
app.delete('/reportdetails/:id', (req, res) => {
  const reportId = req.params.id;
  const query = 'DELETE FROM Reports WHERE report_id = ?';

  db.query(query, [reportId], (err, result) => {
    if (err) {
      console.error('Error deleting report details:', err);
      return res.status(500).send('Error deleting report details.');
    } else {
      if (result.affectedRows > 0) {
        res.send('Report deleted successfully.');
      } else {
        res.status(404).send('Report not found.');
      }
    }
  });
});

// Route to get all report details
app.get('/reportdetails', (req, res) => {
  // SQL query to select all reports
  const query = 'SELECT * FROM Reports';

  // Execute the SQL query
  db.query(query, (err, results) => {
    if (err) {
      // Log the error and send a 500 response if there's an issue with the query
      console.error('Error fetching report details:', err);
      return res.status(500).send('Error fetching report details.');
    } else {
      // Send the list of reports as a JSON response
      res.json(results);
    }
  });
});



// ************************ Plant ****************************

// Endpoint to add a new plant detail
app.post('/add-plantdetail', (req, res) => {
  const { acre_id, plant_type, details, block_id, plantdetailscol, created_by } = req.body;

  // Set the current date and time for created_on
  const created_on = new Date();

  const query = `
    INSERT INTO plantdetails (acre_id, plant_type, details, block_id, plantdetailscol, created_on, created_by) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [acre_id, plant_type, details, block_id, plantdetailscol, created_on, created_by], (err, result) => {
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

// Endpoint to get plant details by plant_id
app.get('/plantdetails/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM plantdetails WHERE plant_id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error retrieving plant details by ID:', err);
      return res.status(500).json({ error: 'Failed to retrieve plant details' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.json(results[0]);
  });
});




// Endpoint to get all plant details for a given property_id
app.get('/plantdetails-by-prop/:property_id', (req, res) => {
  const propertyId = parseInt(req.params.property_id, 10);

  // Validate property_id
  if (isNaN(propertyId)) {
    return res.status(400).json({ error: 'Invalid property_id' });
  }

  const query = `
  select p.plant_id, p.plant_type, p.details, b.block_name,p.block_id  from plantdetails p 
  inner join blocks b on p.block_id = b.block_id inner join property pp on pp.property_id = b.property_id
  where b.property_id= ?
  `;
  db.query(query,[propertyId],(err,results)=>{
    if (err) return res.status(500).send('Error getting plant detail.');
    res.json(results);
  });

});



// Endpoint to update a plant detail by plant_id
app.put('/update-plantdetail/:plant_id', (req, res) => {
  const { plant_id } = req.params;
  const { block_id, plant_type, details, modified_by } = req.body;

  // Set the current date and time for modified_on
  const modified_on = new Date();

  const query = `
    UPDATE plantdetails 
    SET block_id = ?, plant_type = ?, details = ?, modified_on = ?, modified_by = ?
    WHERE plant_id = ?
  `;

  db.query(query, [block_id, plant_type, details, modified_on, modified_by, plant_id], (err, result) => {
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
  const { acre_id, yield_obtained, selling_price, property_id, created_by, other_detail } = req.body;

  // Set the current date and time for created_on
  const created_on = new Date();

  const query = `
    INSERT INTO CropDetails (acre_id, yield_obtained, selling_price, property_id, created_on, created_by, other_detail) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [acre_id, yield_obtained, selling_price, property_id, created_on, created_by, other_detail], (err, result) => {
    if (err) return res.status(500).send('Error adding crop detail.');
    res.send('Crop detail added successfully.');
  });
});

// Endpoint to get all crop details
app.get('/cropdetails', (req, res) => {
  const query = 'SELECT * FROM CropDetails';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send('Error retrieving crop details.');
    res.json(results);
  });
});


// Endpoint to get crop details by crop_id
app.get('/cropdetails-by-prop/:id', (req, res) => {
  const { id } = req.params;
  const query = 'select c.*, p.property_name  from cropdetails c inner join property p on c.property_id = p.property_id WHERE c.property_id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error retrieving crop details by ID:', err);
      return res.status(500).json({ error: 'Failed to retrieve crop details' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Crop not found' });
    }
    res.json(results);
  });
});
// Endpoint to get crop details by crop_id
app.get('/cropdetails/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM CropDetails WHERE crop_id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error retrieving crop details by ID:', err);
      return res.status(500).json({ error: 'Failed to retrieve crop details' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Crop not found' });
    }
    res.json(results[0]);
  });
});

// Endpoint to update a crop detail by crop_id
app.put('/update-cropdetail/:crop_id', (req, res) => {
  const { crop_id } = req.params;
  const { acre_id, yield_obtained, selling_price, property_id, modified_by, other_detail } = req.body;

  // Set the current date and time for modified_on
  const modified_on = new Date();

  const query = `
    UPDATE CropDetails 
    SET acre_id = ?, yield_obtained = ?, selling_price = ?, property_id = ?, modified_on = ?, modified_by = ?, other_detail = ?
    WHERE crop_id = ?
  `;

  db.query(query, [acre_id, yield_obtained, selling_price, property_id, modified_on, modified_by, other_detail, crop_id], (err, result) => {
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
// Endpoint to add a new expenditure detail
app.post('/add-expenditure', (req, res) => {
  console.log(req.body);
  const { acre_id, water, fertilizer, pruning, others, edate, property_id, created_by, fuel } = req.body;

  // Set the current date and time for created_on
  const created_on = new Date();

  const query = `
    INSERT INTO Expenditure (acre_id, water, fertilizer, pruning, others, edate, property_id, created_on, created_by, fuel) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [acre_id, water, fertilizer, pruning, others, edate, property_id, created_on, created_by, fuel], (err, result) => {
    if (err) {
      console.error('Error adding expenditure details:', err);
      res.status(500).send('Error adding expenditure details.');
    } else {
      res.send('Expenditure details added successfully.');
    }
  });
});

// Endpoint to get all expenditure details
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

// Endpoint to get expenditure details by expenditure_id
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
      res.json(result[0]); // Send the first matching result..
    }
  });
});

// Endpoint to get expenditure details by property_id
app.get('/expendituredetails-by-prop/:property_id/:days', (req, res) => {
  const propertyId = req.params.property_id;
  const days = parseInt(req.params.days, 10); // Parse the number of days from the request parameters

  const query = `SELECT * FROM Expenditure 
                 WHERE property_id = ? 
                 AND edate >= DATE_SUB(CURDATE(), INTERVAL ? DAY)`;

  db.query(query, [propertyId, days], (err, result) => {
    if (err) {
      console.error('Error fetching expenditure details:', err);
      res.status(500).send('Error fetching expenditure details.');
    } else {
      res.json(result);
    }
  });
});


// Endpoint to update an expenditure by expenditure_id
app.put('/update-expenditure/:expenditure_id', (req, res) => {
  const { expenditure_id } = req.params;
  const { acre_id, water, fertilizer, pruning, others, edate, property_id, modified_by, fuel } = req.body;

  // Set the current date and time for modified_on
  const modified_on = new Date();

  const query = `
    UPDATE Expenditure 
    SET acre_id = ?, water = ?, fertilizer = ?, pruning = ?, others = ?, edate = ?, property_id = ?, modified_on = ?, modified_by = ?, fuel = ?
    WHERE expenditure_id = ?
  `;

  db.query(query, [acre_id, water, fertilizer, pruning, others, edate, property_id, modified_on, modified_by, fuel, expenditure_id], (err, result) => {
    if (err) return res.status(500).send('Error updating expenditure.');
    res.send('Expenditure updated successfully.');
  });
});

// Endpoint to delete an expenditure by expenditure_id
app.delete('/delete-expenditure/:expenditure_id', (req, res) => {
  const { expenditure_id } = req.params;
  const query = 'DELETE FROM Expenditure WHERE expenditure_id = ?';
  db.query(query, [expenditure_id], (err, result) => {
    if (err) return res.status(500).send('Error deleting expenditure.');
    res.send('Expenditure deleted successfully.');
  });
});





//***************************FERTILIZERS***************************************** */

// Endpoint to add a new fertilizer
app.post('/add-fertilizer', (req, res) => {
  const { acre_id, fertilizer_name, date_of_application, property_id, created_by, other_details } = req.body;
  const created_on = new Date(); // Set the creation date to the current date and time
  const query = `
    INSERT INTO Fertilizers (acre_id, fertilizer_name, date_of_application, property_id, created_on, created_by, other_details) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [acre_id, fertilizer_name, date_of_application, property_id, created_on, created_by, other_details], (err, result) => {
    if (err) return res.status(500).send('Error adding fertilizer.');
    res.send('Fertilizer added successfully.');
  });
});

// Endpoint to get all fertilizers
app.get('/fertilizers', (req, res) => {
  const query = `
    SELECT fertilizer_id, acre_id, fertilizer_name, date_of_application, property_id, created_on, created_by, modified_on, modified_by, other_details 
    FROM Fertilizers
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).send('Error retrieving fertilizers.');
    res.json(results);
  });
});

// Endpoint to get fertilizer details by fertilizer_id
app.get('/fertilizerdetails/:id', (req, res) => {
  const fertilizer_id = parseInt(req.params.id, 10);
  const query = `
    SELECT fertilizer_id, acre_id, fertilizer_name, date_of_application, property_id, created_on, created_by, modified_on, modified_by, other_details 
    FROM Fertilizers 
    WHERE fertilizer_id = ?
  `;

  db.query(query, [fertilizer_id], (err, result) => {
    if (err) {
      console.error('Error fetching fertilizer details:', err);
      res.status(500).send('Error fetching fertilizer details.');
    } else if (result.length === 0) {
      res.status(404).send('Fertilizer details not found.');
    } else {
      res.json(result[0]); // Send the first matching result
    }
  });
});

// Endpoint to get fertilizers by property_id and date_of_application in the last n days
app.get('/fertilizers-by-prop/:property_id/:days', (req, res) => {
  const propertyId = req.params.property_id; // Get property_id from URL params
  const days = parseInt(req.params.days, 10); // Parse the number of days from the request parameters

  const query = `
    SELECT fertilizer_id, fertilizer_name, date_of_application, property_id, created_on, created_by, modified_on, modified_by, other_details 
    FROM Fertilizers
    WHERE property_id = ?
    AND date_of_application >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
  `;

  db.query(query, [propertyId, days], (err, results) => {
    if (err) {
      console.error('Error retrieving fertilizers:', err);
      return res.status(500).send('Error retrieving fertilizers.');
    }
    res.json(results); // Send the result as a JSON array
  });
});


// Endpoint to update a fertilizer by fertilizer_id
app.put('/update-fertilizer/:fertilizer_id', (req, res) => {
  const { fertilizer_id } = req.params;
  const { acre_id, fertilizer_name, date_of_application, property_id, modified_by, other_details } = req.body;
  const modified_on = new Date(); // Set the modification date to the current date and time

  // SQL query to update the fertilizer
  const query = `
    UPDATE Fertilizers 
    SET acre_id = ?, fertilizer_name = ?, date_of_application = ?, property_id = ?, modified_on = ?, modified_by = ?, other_details = ?
    WHERE fertilizer_id = ?
  `;

  // Execute the query
  db.query(
    query,
    [acre_id, fertilizer_name, date_of_application, property_id, modified_on, modified_by, other_details, fertilizer_id],
    (err, result) => {
      if (err) {
        console.error('Error updating fertilizer:', err);
        return res.status(500).send('Error updating fertilizer.');
      }

      if (result.affectedRows === 0) {
        return res.status(404).send('Fertilizer not found.');
      }

      res.send('Fertilizer updated successfully.');
    }
  );
});

// Endpoint to delete a fertilizer by fertilizer_id
app.delete('/delete-fertilizer/:fertilizer_id', (req, res) => {
  const { fertilizer_id } = req.params;

  // SQL query to delete the fertilizer
  const query = 'DELETE FROM Fertilizers WHERE fertilizer_id = ?';

  // Execute the query
  db.query(query, [fertilizer_id], (err, result) => {
    if (err) {
      console.error('Error deleting fertilizer:', err);
      return res.status(500).send('Error deleting fertilizer.');
    }

    if (result.affectedRows === 0) {
      return res.status(404).send('Fertilizer not found.');
    }

    res.send('Fertilizer deleted successfully.');
  });
});

/************PROPERTIES*************** */

// Route to create a new property for a given user
app.post('/add-property-for-user', (req, res) => {
  const {
    property_name,
    total_acre,
    address_1,
    address_2,
    pincode,
    user_id,
    created_on,
    created_by,
    modified_on,
    modified_by
  } = req.body;

  // Start a transaction to ensure both tables are updated atomically
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.status(500).json({ error: 'Failed to start transaction' });
    }

    // Insert into Property table
    const insertPropertyQuery = `
      INSERT INTO Property (property_name, total_acre, address_1, address_2, pincode, user_id, created_on, created_by, modified_on, modified_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertPropertyQuery,
      [property_name, total_acre, address_1, address_2, pincode, user_id, created_on, created_by, modified_on, modified_by],
      (err, result) => {
        if (err) {
          return db.rollback(() => {
            console.error('Error inserting property:', err);
            res.status(500).json({ error: 'Failed to insert property' });
          });
        }

        const property_id = result.insertId; // Get the newly inserted property's ID

        // Insert into Propertyuser table
        const insertPropertyUserQuery = `
          INSERT INTO Propertyuser (property_id, user_id)
          VALUES (?, ?)
        `;

        db.query(insertPropertyUserQuery, [property_id, user_id], (err, result) => {
          if (err) {
            return db.rollback(() => {
              console.error('Error inserting into Propertyuser:', err);
              res.status(500).json({ error: 'Failed to insert into Propertyuser' });
            });
          }

          // Commit the transaction
          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                console.error('Error committing transaction:', err);
                res.status(500).json({ error: 'Failed to commit transaction' });
              });
            }

            res.json({ message: 'Property added successfully' });
          });
        });
      }
    );
  });
});


// Route to get all property details for a given user
app.get('/user-properties/:user_id', (req, res) => {
  const { user_id } = req.params;

  const query = `
    SELECT 
      p.property_id,
      p.property_name,
      p.total_acre,
      p.address_1,
      p.address_2,
      p.pincode,
      p.created_on,
      p.created_by,
      p.modified_on,
      p.modified_by
    FROM 
      Property p
    INNER JOIN 
      Propertyuser pu ON p.property_id = pu.property_id
    WHERE 
      pu.user_id = ?
  `;

  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Error retrieving property details:', err);
      return res.status(500).json({ error: 'Failed to retrieve property details' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No properties found for this user' });
    }

    res.json(results);
  });
});


// Endpoint to add a new property
app.post('/add-property', (req, res) => {
  const { property_name, total_acre, address_1, address_2, pincode, user_id, created_by } = req.body;
  const created_on = new Date();
  const query = `
    INSERT INTO Properties (property_name, total_acre, address_1, address_2, pincode, user_id, created_on, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [property_name, total_acre, address_1, address_2, pincode, user_id, created_on, created_by], (err, result) => {
    if (err) return res.status(500).send('Error adding property.');
    res.send('Property added successfully.');
  });
});

// Endpoint to get all properties
app.get('/properties', (req, res) => {
  const query = 'SELECT * FROM Properties';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send('Error retrieving properties.');
    res.json(results);
  });
});

// Endpoint to get property details by property_id
app.get('/propertydetails/:id', (req, res) => {
  const property_id = parseInt(req.params.id, 10);
  const query = 'SELECT * FROM Property WHERE property_id = ?';

  db.query(query, [property_id], (err, result) => {
    if (err) {
      console.error('Error fetching property details:', err);
      res.status(500).send('Error fetching property details.');
    } else if (result.length === 0) {
      res.status(404).send('Property details not found.');
    } else {
      res.json(result[0]); // Send the first matching result
    }
  });
});

// Route to get properties held by a user
app.get('/properties/:user_id', (req, res) => {
  console.log(req.params);
  const { user_id } = req.params;
  const query = `
    SELECT p.property_id, p.property_name, p.total_acre, p.address_1, p.address_2, p.pincode, p.created_on, p.created_by, p.modified_on, p.modified_by
    FROM Property p
    JOIN Propertyuser pu ON p.property_id = pu.property_id
    WHERE pu.user_id = ?
  `;

  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Error retrieving properties:', err);
      return res.status(500).json({ error: 'Failed to retrieve properties' });
    }
    res.json(results);
  });
});


// Endpoint to update a property by property_id
app.put('/update-property/:property_id', (req, res) => {
  const { property_id } = req.params;
  const { property_name, total_acre, address_1, address_2, pincode, user_id, modified_by } = req.body;
  const modified_on = new Date();

  // SQL query to update the property
  const query = `
    UPDATE Property
    SET property_name = ?, total_acre = ?, address_1 = ?, address_2 = ?, pincode = ?, user_id = ?, modified_on = ?, modified_by = ?
    WHERE property_id = ?
  `;

  // Execute the query
  db.query(query, [property_name, total_acre, address_1, address_2, pincode, user_id, modified_on, modified_by, property_id], (err, result) => {
    if (err) {
      console.error('Error updating property:', err);
      return res.status(500).send('Error updating property.');
    }

    if (result.affectedRows === 0) {
      return res.status(404).send('Property not found.');
    }

    res.send('Property updated successfully.');
  });
});

// Endpoint to delete a property by property_id
app.delete('/delete-property/:property_id', (req, res) => {
  const { property_id } = req.params;

  // SQL query to delete the property
  const query = 'DELETE FROM Property WHERE property_id = ?';

  // Execute the query
  db.query(query, [property_id], (err, result) => {
    if (err) {
      console.error('Error deleting property:', err);
      return res.status(500).send('Error deleting property.');
    }

    if (result.affectedRows === 0) {
      return res.status(404).send('Property not found.');
    }

    res.send('Property deleted successfully.');
  });
});

/***************BLOCK******************* */

// Endpoint to add a new block
app.post('/addblock', (req, res) => {
  const { block_name, block_area, property_id } = req.body;

  const query = `
    INSERT INTO blocks (block_name, block_area, property_id)
    VALUES (?, ?, ?)
  `;

  db.query(query, [block_name, block_area, property_id], (err, result) => {
    if (err) {
      console.error('Error adding block:', err.stack);
      return res.status(500).json({ error: 'Failed to add block' });
    }
    res.status(201).json({ message: 'Block added successfully', block_id: result.insertId });
  });
});

// Endpoint to get block by ID
app.get('/blockdetails/:id', (req, res) => {
  const blockId = req.params.id;
  const query = 'SELECT * FROM blocks WHERE block_id = ?';

  db.query(query, [blockId], (err, results) => {
    if (err) {
      console.error('Error retrieving block details:', err);
      return res.status(500).send('Error retrieving block details.');
    }

    if (results.length === 0) {
      return res.status(404).send('Block not found.');
    }

    res.json(results[0]); // Send the first result (block) as JSON
  });
});

// Endpoint to get all blocks by property_id
app.get('/blocks-by-prop/:property_id', (req, res) => {
  const propertyId = req.params.property_id;

  const query = `
    SELECT b.*, p.property_name
    FROM blocks  b inner join property p on b.property_id = p.property_id
    WHERE b.property_id = ?
  `;

  db.query(query, [propertyId], (err, results) => {
    if (err) {
      console.error('Error retrieving blocks for property_id:', err.stack);
      return res.status(500).json({ error: 'Failed to retrieve blocks' });
    }
    res.json(results);
  });
});

// Endpoint to update a block by block_id
app.put('/updateblock/:block_id', (req, res) => {
  const blockId = req.params.block_id;
  const { block_name, block_area, property_id } = req.body;

  const query = `
    UPDATE blocks 
    SET block_name = ?, block_area = ?, property_id = ?
    WHERE block_id = ?
  `;

  db.query(query, [block_name, block_area, property_id, blockId], (err, result) => {
    if (err) {
      console.error('Error updating block:', err.stack);
      return res.status(500).json({ error: 'Failed to update block' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Block not found' });
    }
    res.json({ message: 'Block updated successfully' });
  });
});

// Endpoint to delete a block by block_id
app.delete('/deleteblock/:block_id', (req, res) => {
  const blockId = req.params.block_id;

  const query = `
    DELETE FROM blocks
    WHERE block_id = ?
  `;

  db.query(query, [blockId], (err, result) => {
    if (err) {
      console.error('Error deleting block:', err.stack);
      return res.status(500).json({ error: 'Failed to delete block' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Block not found' });
    }
    res.json({ message: 'Block deleted successfully' });
  });
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
