const { PostImage } = require('../models');

class PostImageRepository {
    async create(data) {
        const image = await PostImage.create(data);
        return image;
    }

    async findById(id) {
        const image = await PostImage.findByPk(id);
        return image;
    }

    async deleteById(id) {
        const image = await PostImage.findByPk(id);
        if (!image) {
            return null;
        }
        await image.destroy();
        return true;
    }
}

module.exports = new PostImageRepository();
