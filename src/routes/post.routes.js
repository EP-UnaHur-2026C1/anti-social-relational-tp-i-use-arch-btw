const { Router } = require('express');
const router = Router();
const validateSchema = require('../middlewares/validator.middleware');
const {
    createPostSchema,
    updatePostSchema,
    addPostTagSchema,
} = require('../schemas/post.schema');
const { addPostImageSchema } = require('../schemas/postImage.schema');
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

router.post('/', validateSchema(createPostSchema), createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', validateSchema(updatePostSchema), updatePost);
router.delete('/:id', deletePost);
router.post('/:id/images', validateSchema(addPostImageSchema), addPostImage);
router.delete('/:id/images/:imageId', removePostImage);
router.post('/:id/tags', validateSchema(addPostTagSchema), addPostTag);
router.delete('/:id/tags/:tagId', removePostTag);

module.exports = router;
