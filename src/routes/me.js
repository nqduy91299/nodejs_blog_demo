const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController') 

router.get('/store/courses', meController.storedCourses);
router.get('/bin/courses', meController.binCourses);

module.exports = router;