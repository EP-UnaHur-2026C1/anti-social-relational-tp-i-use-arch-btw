const AppError = require('../helpers/AppError');
const commentRepository = require('../repositories/CommentRepository');

class CommentService {
    async createComment(commentData) {
        const existingComment = await commentRepository.findByContent(
            commentData.content
        );
        if (existingComment) {
            throw new AppError(
                'El comentario con ese contenido ya está registrado.',
                409
            );
        }
        const newComment = await commentRepository.create(commentData);
        return newComment;
    }

    async getComments() {
        const comments = await commentRepository.findAll();
        return comments;
    }

    async updateComment(id, commentData) {
        const updatedComment = await commentRepository.update(id, commentData);
        if (!updatedComment) {
            throw new AppError(`Comentario con id ${id} no encontrado.`, 404);
        }
        return updatedComment;
    }

    async deleteComment(id) {
        const comment = await commentRepository.delete(id);
        if (!comment) {
            throw new AppError(`Comentario con id ${id} no encontrado.`, 404);
        }
        return comment;
    }
}
module.exports = new CommentService();
