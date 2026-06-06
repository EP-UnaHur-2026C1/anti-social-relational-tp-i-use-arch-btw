const { Router } = require('express');
const router = Router();
const {
    createComment,
    updateComment,
    deleteComment,
} = require('../controllers/comment.controller');

router.post('/', createComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

module.exports = router;
