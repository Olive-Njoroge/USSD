const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('USSD App is running!');
});


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// USSD endpoint
app.post('/ussd', async (req, res) => {
  console.log("USSD Request:", req.body);
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  let response = '';

  const textArray = text.split('*');
  const userResponse = textArray[textArray.length - 1];

  try {
    if (text === '') {
      response = `CON Welcome to SafeStay
1. Register
2. Login`;
    }
    else if (text === '1') {
      response = 'CON Enter a 4-digit PIN:';
    }
    else if (textArray[0] === '1' && textArray.length === 2) {
      const newUser = new User({ phoneNumber, pin: userResponse });
      await newUser.save();
      response = 'END Registration successful!';
    }
    else if (text === '2') {
      response = 'CON Enter your PIN:';
    }
    else if (textArray[0] === '2' && textArray.length === 2) {
      const user = await User.findOne({ phoneNumber });
      response = user && user.pin === userResponse
        ? 'END Login successful!'
        : 'END Invalid PIN!';
    }

    res.set('Content-Type', 'text/plain');
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send('END Error occurred');
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
