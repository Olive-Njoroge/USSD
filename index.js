const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const User = require('./models/User');
const ConnectDB = require('./config/db')

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('USSD App is running!');
});


// Connect to MongoDB
ConnectDB();

// USSD endpoint
app.post('/ussd', require('./routes/USSDRoute'))

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
