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
        const months = Number(process.env.COMMENT_VISIBILITY_MONTHS) || 6;
        const cutoff = new Date();
        cutoff.setMonth(cutoff.getMonth() - months);

        const comments = await Comment.findAll({
            where: {
                dateTime: {
                    [Op.gte]: cutoff,
                },
            },
        });
        return comments;
    }

    async update(id, commentData) {
        const comment = await Comment.findByPk(id);
        if (!comment) {
            return null;
        }
        await comment.update(commentData);
        return comment;
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
