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
const fertiRoutes = require('./routes/fertilizerRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const blockRoutes = require('./routes/blockRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', acreRoutes);
app.use('/api', laborRoutes);
app.use('/api', userRoutes);
app.use('/api', rainRoutes);
app.use('/api', reportRoutes);
app.use('/api', plantRoutes);
app.use('/api', cropRoutes);
app.use('/api', expenditureRoutes);
app.use('/api', rainReportRoutes);
app.use('/api',fertiRoutes);
app.use('/api',propertyRoutes);
app.use('/api', blockRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
