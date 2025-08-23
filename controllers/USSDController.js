const User = require('../models/User');
const at = require('../at');
const sms = at.SMS;

exports.handleUSSD = async (req, res) => {
    console.log("USSD request: ", req.body);
    try {
        const { phoneNumber, text } = req.body;
        let response = '';

        const textArray = text.split('*');
        const userResponse = textArray[textArray.length - 1];

        if (text === '') {
            response = "CON Hello and Welcome\n1. Register\n2. Login";

        } else if (text === '1') {
            response = "CON Enter a 4-digit PIN:";

        } else if (textArray[0] === '1' && textArray.length === 2) {
            const newUser = new User({ phoneNumber, pin: userResponse });
            await newUser.save();

            // Send SMS after registration
            await sms.send({
                to: [phoneNumber],
                message: 'You have successfully registered!'
            });

            response = 'END Registration successful! SMS confirmation sent.';

        } else if (text === '2') {
            response = "CON Enter your PIN:";

        } else if (textArray[0] === '2' && textArray.length === 2) {
            const user = await User.findOne({ phoneNumber });

            if (user && user.pin === userResponse) {
                await sms.send({
                    to: [phoneNumber],
                    message: 'You have successfully logged in!'
                });
                response = "END Login successful!";
            } else {
                response = "END Invalid PIN!";
            }
        }

        // Always set content type for USSD
        res.set('Content-Type', 'text/plain');
        res.send(response);

    } catch (error) {
        console.log(error);
        res.status(500).send('END Error occurred');
    }
};
