const express = require('express');
const router = express.Router();
const guard = require('../middlewares/guard')

const courseController = require('../app/controllers/CourseController') 



router.get('/', courseController.index)
router.get('/create', guard, courseController.create);
router.post('/store', guard, courseController.store);
router.get('/:id/edit', guard, courseController.edit);
router.patch('/:id/restore', guard, courseController.restore);
router.delete('/:id/force', guard, courseController.force);
router.put('/:id', guard, courseController.update);
router.delete('/:id', guard, courseController.delete);

router.get('/:slug', courseController.show);

module.exports = router;