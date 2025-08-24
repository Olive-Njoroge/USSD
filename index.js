const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const User = require('./models/User');
const ConnectDB = require('./config/db');
const PaymentRoute = require('./routes/PaymentsRoute');
const USSDRoute = require("./routes/USSDRoute");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('USSD App is running!');
});


// Connect to MongoDB
ConnectDB();

// USSD endpoint
app.use('/', USSDRoute);

//Payments endpoint
app.use('/', PaymentRoute);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
