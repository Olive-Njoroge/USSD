const express = require('express');
const router = express.Router();
const {Payments, PaymentCallback } = require('../controllers/PaymentController');

router.post("/payments", Payments);
router.post("/payment/callback", PaymentCallback);

module.exports = router;