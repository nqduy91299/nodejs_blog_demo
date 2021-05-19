const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthenticationController');

router.get('/', authController.logout)

module.exports = router;