const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthenticationController');
const registerValidator = require('../validators/registerValidator');

router.get('/', authController.showRegister)
router.post('/', registerValidator, authController.register)

module.exports = router;