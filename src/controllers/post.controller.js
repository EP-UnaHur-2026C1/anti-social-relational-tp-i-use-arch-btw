const postService = require('../service/postService');
const catchAsync = require('../middlewares/catchAsync');
const { created, success, noContent, ok } = require('../helpers/response');

const getAllPosts = catchAsync(async (req, res) => {
    const posts = await postService.getAllPosts();
    return ok(res, posts);
});

const getPostById = catchAsync(async (req, res) => {
    const post = await postService.getPostById(req.params.id);
    return ok(res, post);
});

const createPost = catchAsync(async (req, res) => {
    const post = await postService.createPost(req.body);
    return created(res, post, 'Post creado con éxito.');
});

const deletePost = catchAsync(async (req, res) => {
    await postService.deletePost(req.params.id);
    return noContent(res);
});

const updatePost = catchAsync(async (req, res) => {
    const post = await postService.updatePost(req.params.id, req.body);
    return success(res, post, 'Post actualizado con éxito.');
});

const addPostImage = catchAsync(async (req, res) => {
    const { url } = req.body;
    const image = await postService.addPostImage(req.params.id, url);
    return created(res, image, 'Imagen agregada con éxito.');
});

const removePostImage = catchAsync(async (req, res) => {
    await postService.removePostImage(req.params.imageId);
    return noContent(res);
});

const addPostTag = catchAsync(async (req, res) => {
    const { tag_id } = req.body;
    const postTag = await postService.addPostTag(req.params.id, tag_id);
    return created(res, postTag, 'Etiqueta agregada al post con éxito.');
});

const removePostTag = catchAsync(async (req, res) => {
    await postService.removePostTag(req.params.id, req.params.tagId);
    return noContent(res);
});

module.exports = {
    updatePost,
    getAllPosts,
    getPostById,
    deletePost,
    createPost,
    addPostImage,
    removePostImage,
    addPostTag,
    removePostTag,
};
