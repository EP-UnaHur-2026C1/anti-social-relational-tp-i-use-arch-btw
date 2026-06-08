const { Router } = require('express');
const router = Router();
const {
    createCommentSchema,
    updateCommentSchema,
} = require('../schemas/comment.schema');
const validateSchema = require('../middlewares/validator.middleware');
const {
    createComment,
    updateComment,
    deleteComment,
    getComments,
} = require('../controllers/comment.controller');

/**
 * @openapi
 * /api/comments:
 *   get:
 *     summary: Obtiene todos los comentarios
 *     responses:
 *       200:
 *         description: Lista de comentarios
*/
router.get('/', getComments);

/**
 * @openapi
 * /api/comments/{id}:
 *   put:
 *     summary: Actualiza un comentario
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentario actualizado
*/
router.put('/:id', validateSchema(updateCommentSchema), updateComment);

/**
 * @openapi
 * /api/comments:
 *   post:
 *     summary: Crea un nuevo comentario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           type: object
 *           properties:
 *             content:
 *               type: string
 *               user_nickName:
 *                 type: string
 *               post_id:
 *                 type: integer
 *       responses:
 *         201:
 *           description: Comentario creado
 *         400:
 *           description: Error de validación
*/
router.post('/', validateSchema(createCommentSchema), createComment);

/**
 * @openapi
 * /api/comments/{id}:
 *   delete:
 *     summary: Elimina un comentario
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *     responses:
 *       200:
 *         description: Comentario eliminado
 */
router.delete('/:id', deleteComment);


module.exports = router;