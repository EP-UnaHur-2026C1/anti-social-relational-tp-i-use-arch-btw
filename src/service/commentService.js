const commentRepository = require('../repositories/CommentRepository');

class CommentService {
    async createComment(commentData) {
        const existingComment = await commentRepository.findByContent(
            commentData.content
        );
        if (existingComment) {
            throw new Error(
                'El comentario con ese contenido ya está registrado.'
            );
        }
        const newComment = await commentRepository.create(commentData);
        return newComment;
    }

    async getComments() {
        const comments = await commentRepository.findAll();
        return comments;
    }
    async deleteComment(id) {
        const comment = await commentRepository.delete(id);
        if (!comment) {
            throw new Error(`Comentario con id ${id} no encontrado.`);
        }
        return comment;
    }
}
module.exports = new CommentService();
