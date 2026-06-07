const TagRepository = require('../repositories/TagRepository');

class TagService {
    async createTag(data) {
        const tag = await TagRepository.create(data);
        return tag;
    }

    async getAllTags() {
        const tags = await TagRepository.findAll();
        return tags;
    }

    async deleteTag(id) {
        const deleted = await TagRepository.deleteById(id);
        if (!deleted) {
            throw new Error('Etiqueta no encontrada.');
        }
        return deleted;
    }
}

module.exports = new TagService();
