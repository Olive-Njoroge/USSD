const User = require('../models/User');

exports.handleUSSD = async (req, res) => {
    console.log("USSD request: ", req.body);
    try{
        const {phoneNumber, text} = req.body;
        let response = '';

        const textArray = text.split('*');
        const userResponse = textArray[textArray.length -1];

        if (text === ''){
            response = "CON Hello and Welcome\n 1.Register\n  2.Login";
        } else if(text === '1'){
            response = "Enter a 4-digit pin:";
        }else if(textArray[0] === '1' && textArray.length === 2){
            const newUser = new User({ phoneNumber, pin: userResponse });
            await newUser.save();
            response = 'END Registration successful!';
        }else if (text === '2') {
        response = " Enter your PIN:";
        }
        else if (textArray[0] === '2' && textArray.length === 2) {
        const user = await User.findOne({ phoneNumber });
        response = user && user.pin === userResponse
            ? "END Login successful!"
            : "END Invalid PIN!";
        }
        res.set('Content-Type', 'text/plain');
        res.send(response);
    }catch (error) {
        console.log(error);
        res.status(500).send('END Error occurred');
  }
}