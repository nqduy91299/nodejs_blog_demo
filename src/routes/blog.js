const express = require('express');
const router = express.Router();
const multer = require('multer');

const guard = require('../middlewares/guard')
const blogValidate = require('../validators/blogValidator')
const blogController = require('../app/controllers/BlogController');
const commentController = require('../app/controllers/CommentController');
const commentValidate = require('../validators/commentValidator');

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./src/public/img");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +(file.originalname)) //Appending extension
    }
});
router.use(multer({storage: storage}).single('image'))


router.get('/create', guard, blogController.create)
router.post('/store', blogValidate, guard, blogController.store)
router.get('/:id/edit', guard, blogController.edit)
router.patch('/:id/restore', guard, blogController.restore)
router.delete('/:id/force', guard, blogController.force)
router.post('/:id/comment/:slug', commentValidate, guard, commentController.comment)
router.put('/:id', blogValidate, guard, blogController.update)
router.delete('/:id', guard, blogController.delete)
router.get('/:slug', blogController.detail)

module.exports = router;