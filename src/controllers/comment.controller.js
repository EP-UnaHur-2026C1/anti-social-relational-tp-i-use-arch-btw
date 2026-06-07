const commentService = require('../service/commentService');
const catchAsync = require('../middlewares/catchAsync');
const { created, success, ok } = require('../helpers/response');

const createComment = catchAsync(async (req, res) => {
    const newComment = await commentService.createComment(req.body);
    return created(res, newComment, '✅ Comentario creado con éxito.');
});

const updateComment = catchAsync(async (req, res) => {
    const updatedComment = await commentService.updateComment(
        req.params.id,
        req.body
    );
    return success(res, updatedComment, '✅ Comentario actualizado con éxito.');
});

const getComments = catchAsync(async (req, res) => {
    const comments = await commentService.getComments();
    return ok(res, comments);
});

const deleteComment = catchAsync(async (req, res) => {
    const comment = await commentService.deleteComment(req.params.id);
    return success(
        res,
        comment,
        `✅ Comentario con id ${req.params.id} eliminado con éxito.`
    );
});

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getComments,
};
