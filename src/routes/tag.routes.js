const { Router } = require('express');
const router = Router();
const { createTag, getTags, deleteTag } = require('../controllers/tag.controller');
const validateSchema = require('../middlewares/validator.middleware');
const { createTagSchema } = require('../schemas/tag.schema');

router.post('/', validateSchema(createTagSchema), createTag);
router.get('/', getTags);
router.delete('/:id', deleteTag);

module.exports = router;
