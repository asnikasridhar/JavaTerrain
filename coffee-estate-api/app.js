const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const acreRoutes = require('./routes/acreRoutes');
const laborRoutes = require('./routes/laborRoutes');
const rainRoutes = require('./routes/rainDetailsRoutes');
const reportRoutes = require('./routes/reportRoutes');
const plantRoutes = require('./routes/plantRoutes');
const cropRoutes = require('./routes/cropRoutes');
const expenditureRoutes = require('./routes/expenditureRoutes');
const rainReportRoutes = require('./routes/rainReportRoutes');


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', acreRoutes);
app.use('/api', laborRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rain', rainRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/expenditures', expenditureRoutes);
app.use('/api/', rainReportRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
