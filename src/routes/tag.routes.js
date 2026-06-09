const { Router } = require('express');
const router = Router();
const {
    createTag,
    getTags,
    deleteTag,
} = require('../controllers/tag.controller');
const validateSchema = require('../middlewares/validator.middleware');
const { createTagSchema } = require('../schemas/tag.schema');

/**
 * @openapi
 * /api/tags:
 *   post:
 *     summary: Crear una nueva etiqueta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Etiqueta creada con éxito
 */
router.post('/', validateSchema(createTagSchema), createTag);

/**
 * @openapi
 * /api/tags:
 *   get:
 *     summary: Obtener todas las etiquetas
 *     responses:
 *       200:
 *         description: Lista de etiquetas obtenida
 */
router.get('/', getTags);

/**
 * @openapi
 * /api/tags/{id}:
 *   delete:
 *     summary: Eliminar una etiqueta
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *     responses:
 *       204:
 *         description: Etiqueta eliminada
 */
router.delete('/:id', deleteTag);

module.exports = router;
