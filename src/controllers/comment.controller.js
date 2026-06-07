const commentService = require('../service/commentService');

const createComment = async (req, res) => {
    try {
        const userData = req.body;
        const newComment = await commentService.createComment(userData);
        return res.status(201).json({
            message: '✅ Comentario creado con éxito.',
            data: newComment,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateComment = async (req, res) => {};

const getComments = async (req, res) => {
    const comments = await commentService.getComments();
    return res.status(200).json({
        message: '✅ Comentarios obtenidos con éxito.',
        data: comments,
    });
};

const deleteComment = async (req, res) => {
    const { id } = req.params;
    const comment = await commentService.deleteComment(id);
    return res.status(200).json({
        message: `✅ Comentario con id ${id} eliminado con éxito.`,
    });
};

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getComments,
};
