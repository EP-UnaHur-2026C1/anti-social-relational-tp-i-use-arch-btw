const { Op } = require('sequelize');
const { Comment } = require('../models');

class CommentRepository {
    async create(commentData) {
        const newComment = await Comment.create(commentData);
        return newComment;
    }

    async findByContent(content) {
        const comment = await Comment.findOne({
            where: {
                content: {
                    [Op.like]: content,
                },
            },
        });
        return comment;
    }
    async findAll() {
        const comments = await Comment.findAll();
        return comments;
    }
    async delete(id) {
        const comment = await Comment.findByPk(id);
        if (!comment) {
            return null;
        }
        await comment.destroy();
        return comment;
    }
}
module.exports = new CommentRepository();
