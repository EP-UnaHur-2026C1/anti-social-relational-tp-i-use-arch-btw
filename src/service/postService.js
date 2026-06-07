const AppError = require('../helpers/AppError');
const PostRepository = require('../repositories/PostRepository');
const PostImageRepository = require('../repositories/PostImageRepository');
const { User, Tag, PostTag } = require('../models');

class PostService {
    async getAllPosts() {
        return PostRepository.findAll();
    }

    async getPostById(id) {
        const post = await PostRepository.findById(id);
        if (!post) {
            throw new AppError('Post no encontrado.', 404);
        }
        return post;
    }

    async createPost(data) {
        const user = await User.findByPk(data.user_nickName);
        if (!user) {
            throw new AppError('Usuario no encontrado.', 404);
        }

        const { images, tags, ...postData } = data;
        const post = await PostRepository.create(postData);

        if (images && images.length > 0) {
            for (const url of images) {
                await PostImageRepository.create({ url, post_id: post.id });
            }
        }

        if (tags && tags.length > 0) {
            for (const name of tags) {
                const [tag] = await Tag.findOrCreate({ where: { name } });
                await PostTag.create({ post_id: post.id, tag_id: tag.id });
            }
        }

        return PostRepository.findById(post.id);
    }

    async updatePost(id, data) {
        const post = await PostRepository.findById(id);
        if (!post) {
            throw new AppError('Post no encontrado.', 404);
        }
        return PostRepository.update(post, data);
    }

    async deletePost(id) {
        const deleted = await PostRepository.deleteById(id);
        if (!deleted) {
            throw new AppError('Post no encontrado.', 404);
        }
        return deleted;
    }

    async addPostImage(postId, url) {
        const post = await PostRepository.findById(postId);
        if (!post) {
            throw new AppError('Post no encontrado.', 404);
        }
        const image = await PostImageRepository.create({
            url,
            post_id: postId,
        });
        return image;
    }

    async removePostImage(imageId) {
        const deleted = await PostImageRepository.deleteById(imageId);
        if (!deleted) {
            throw new AppError('Imagen no encontrada.', 404);
        }
        return deleted;
    }

    async addPostTag(postId, tagId) {
        const post = await PostRepository.findById(postId);
        if (!post) {
            throw new AppError('Post no encontrado.', 404);
        }
        const tag = await Tag.findByPk(tagId);
        if (!tag) {
            throw new AppError('Etiqueta no encontrada.', 404);
        }
        const postTag = await PostTag.create({
            post_id: postId,
            tag_id: tagId,
        });
        return postTag;
    }

    async removePostTag(postId, tagId) {
        const postTag = await PostTag.findOne({
            where: { post_id: postId, tag_id: tagId },
        });
        if (!postTag) {
            throw new AppError('Relación post-etiqueta no encontrada.', 404);
        }
        await postTag.destroy();
        return true;
    }
}

module.exports = new PostService();
