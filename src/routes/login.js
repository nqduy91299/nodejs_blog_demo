const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authLoged')

const authController = require('../app/controllers/AuthenticationController');
const loginValidator = require('../validators/loginValidator');

router.get('/', auth, authController.showLogin)
router.post('/', loginValidator, authController.login)

module.exports = router;