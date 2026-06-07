const { Tag } = require('../models');

class TagRepository {
    async create(data) {
        const tag = await Tag.create(data);
        return tag.toJSON();
    }

    async findAll() {
        const tags = await Tag.findAll();
        return tags;
    }

    async findById(id) {
        const tag = await Tag.findByPk(id);
        return tag;
    }

    async deleteById(id) {
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return null;
        }
        await tag.destroy();
        return true;
    }
}

module.exports = new TagRepository();
