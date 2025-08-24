const User = require('../models/User');
const at = require('../at');
const payments = at.PAYMENTS;

exports.Payments = async (req, res) => {
    console.log("Payment request: ", req.body);
    const { phoneNumber, amount, description } = req.body;

    try {
        const response = await payments.mobileCheckout({
            productName: process.env.AT_PRODUCT_NAME,
            phoneNumber: phoneNumber, // keep as string
            currencyCode: "KES",
            amount: amount,
            metadata: {
                description: description || "Payment for service",
                callbackUrl: `${process.env.BASE_URL}/payment/callback`
            }
        });

        console.log("Payment response: ", response);

        // Save initial transaction with "Pending" status
        const user = await User.findOne({ phoneNumber });
        if (user) {
            user.payments.push({
                amount,
                status: "Pending",
                transactionId: response.transactionId || "TBD"
            });
            await user.save();
        }

        res.status(200).json({
            success: true,
            message: "Payment request processed. Await callback for confirmation.",
            data: response
        });

    } catch (error) {
        console.error("Payment error: ", error);
        res.status(500).json({
            success: false,
            message: "Payment request failed",
            error: error.message || error
        });
    }
};


exports.PaymentCallback = async (req, res) => {
    console.log("Payment Callback: ", req.body);
    const { transactionId, status, phoneNumber } = req.body;

    try {
        const user = await User.findOne({ phoneNumber });
        if (user) {
            const payment = user.payments.find(p => p.transactionId === transactionId);
            if (payment) {
                payment.status = status; // Update status (e.g., Success or Failed)
            } else {
                user.payments.push({ transactionId, amount: 0, status });
            }
            await user.save();
        }

        res.status(200).send("Callback processed");
    } catch (err) {
        console.error("Callback error:", err);
        res.status(500).send("Callback failed");
    }
};

