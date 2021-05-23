const express = require('express');
const multer = require('multer');
const router = express.Router();

const meController = require('../app/controllers/MeController'); 
const changeInfoValidator = require('../validators/changeInfoValidator');
const changePasswordValidator = require('../validators/changePasswordValidator');

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./src/public/img");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +(file.originalname)) //Appending extension
    }
});
router.use(multer({storage: storage}).single('avatar'))


router.get('/store/courses', meController.storedCourses);
router.get('/bin/courses', meController.binCourses);
router.get('/store/blogs', meController.storedBlogs);
router.get('/bin/blogs', meController.binBlogs);
router.get('/change-password', meController.changePasswordShow)
router.put('/change-password', changePasswordValidator, meController.changePassword)
router.get('/', meController.info)
router.put('/', changeInfoValidator, meController.changeInfo)

module.exports = router;