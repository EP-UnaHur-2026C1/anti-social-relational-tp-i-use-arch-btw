const { Router } = require('express');
const router = Router();
const { createCommentSchema } = require('../schemas/comment.schema');
const validateSchema = require('../middlewares/validator.middleware');
const {
    createComment,
    updateComment,
    deleteComment,
    getComments,
} = require('../controllers/comment.controller');

router.post('/', validateSchema(createCommentSchema), createComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);
router.get('/', getComments);

module.exports = router;
