const express = require('express');
const router = express.Router();
const { handleUSSD } = require('../controllers/USSDController');

router.post('/ussd', handleUSSD);

module.exports = router;
