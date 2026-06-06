const { Router } = require('express');
const router = Router();
const {
    updatePost,
    getAllPosts,
    getPostById,
    deletePost,
    createPost,
    addPostImage,
    removePostImage,
    addPostTag,
    removePostTag,
} = require('../controllers/post.controller');

router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:id/images', addPostImage);
router.delete('/:id/images/:imageId', removePostImage);
router.post('/:id/tags', addPostTag);
router.delete('/:id/tags/:tagId', removePostTag);

module.exports = router;
