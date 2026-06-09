const { Router } = require('express');
const router = Router();
const validateSchema = require('../middlewares/validator.middleware');
const {
    createPostSchema,
    updatePostSchema,
    addPostTagSchema,
} = require('../schemas/post.schema');
const { addPostImageSchema } = require('../schemas/postImage.schema');
const {
    updatePost,
    getAllPosts,
    getPostById,
    deletePost,
    createPost,
    addPostImage,
    removePostImage,
    addPostTag,
    removePostTag,
} = require('../controllers/post.controller');

/**
 * @openapi
 * /api/posts:
 *   post:
 *     summary: Crea un nuevo post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               user_nickName:
 *                 type: string
 *               images:
 *                 type: array
 *               items:
 *                 type: string
 *               tags:
 *                 type: array
 *     responses:
 *       201:
 *         description: Post creado correctamente
 */
router.post('/', validateSchema(createPostSchema), createPost);

/**
 * @openapi
 * /api/posts:
 *   get:
 *     summary: Obtener todos los posts
 *     responses:
 *       200:
 *         description: Lista de posts obtenida
 */
router.get('/', getAllPosts);

/**
 * @openapi
 * /api/posts/{id}:
 *   get:
 *     summary: Obtener un post por su ID
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *     responses:
 *       200:
 *         description: Detalle del post
 */
router.get('/:id', getPostById);

/**
 * @openapi
 * /api/posts/{id}:
 *   put:
 *     summary: Actualiza un post
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
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post actualizado
 */
router.put('/:id', validateSchema(updatePostSchema), updatePost);

/**
 * @openapi
 * /api/posts/{id}:
 *   delete:
 *     summary: Elimina un post
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *     responses:
 *       200:
 *         description: Post eliminado
 */
router.delete('/:id', deletePost);

/**
 * @openapi
 * /api/posts/{id}/images:
 *   post:
 *     summary: Añadir una imagen a un post
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
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Imagen añadida
 */
router.post('/:id/images', validateSchema(addPostImageSchema), addPostImage);

/**
 * @openapi
 * /api/posts/{id}/images/{imageId}:
 *   delete:
 *     summary: Eliminar una imagen de un post
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *     - in: path
 *       name: imageId
 *       required: true
 *       schema:
 *         type: integer
 *     responses:
 *       200:
 *         description: Imagen eliminada
 */
router.delete('/:id/images/:imageId', removePostImage);

/**
 * @openapi
 * /api/posts/{id}/tags:
 *   post:
 *     summary: Añadir una etiqueta a un post
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
 *               tag_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Etiqueta añadida
 */

router.post('/:id/tags', validateSchema(addPostTagSchema), addPostTag);

/**
 * @openapi
 * /api/posts/{id}/tags/{tagId}:
 *   delete:
 *     summary: Eliminar una etiqueta de un post
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *     - in: path
 *       name: tagId
 *       required: true
 *       schema:
 *         type: integer
 *     responses:
 *       200:
 *         description: Etiqueta eliminada
 */
router.delete('/:id/tags/:tagId', removePostTag);

module.exports = router;
