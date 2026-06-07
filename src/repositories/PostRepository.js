const { Op } = require('sequelize');
const { Post } = require('../models');

const getVisibleCommentsWhere = () => {
    const months = Number(process.env.COMMENT_VISIBILITY_MONTHS) || 6;
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - months);
    return { dateTime: { [Op.gte]: cutoff } };
};

class PostRepository {
    async findAll() {
        const posts = await Post.findAll({
            include: [
                'user',
                {
                    association: 'comments',
                    where: getVisibleCommentsWhere(),
                    required: false,
                },
                'images',
                'tags',
            ],
        });
        return posts;
    }

    async findById(id) {
        const post = await Post.findByPk(id, {
            include: [
                'user',
                {
                    association: 'comments',
                    where: getVisibleCommentsWhere(),
                    required: false,
                },
                'images',
                'tags',
            ],
        });
        return post;
    }

    async create(data) {
        const post = await Post.create(data);
        return post;
    }

    async update(post, data) {
        await post.update(data);
        return post;
    }

    async deleteById(id) {
        const post = await Post.findByPk(id);
        if (!post) {
            return null;
        }
        await post.destroy();
        return true;
    }
}

module.exports = new PostRepository();
