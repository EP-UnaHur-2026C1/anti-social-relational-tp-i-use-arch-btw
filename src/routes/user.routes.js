const { Router } = require('express');
const {
    createUser,
    getUsers,
    getUserByNickName,
    updateUser,
    deleteUser,
    getUserPosts,
    getUserComments,
} = require('../controllers/user.controller');
const validateSchema = require('../middlewares/validator.middleware');
const {
    createUserSchema,
    updateUserSchema,
} = require('../schemas/user.schema');
const router = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', getUsers);

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickName:
 *                 type: string
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 *       409:
 *         description: Conflicto - usuario ya existe
 */
router.post('/', validateSchema(createUserSchema), createUser);

/**
 * @openapi
 * /api/users/{nickName}:
 *   get:
 *     summary: Obtener usuario por nickName
 *     parameters:
 *     - in: path
 *       name: nickName
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 */
router.get('/:nickName', getUserByNickName);

/**
 * @openapi
 * /api/users/{nickName}:
 *   put:
 *     summary: Actualizar usuario
 *     parameters:
 *     - in: path
 *       name: nickName
 *       required: true
 *       schema:
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router.put('/:nickName', validateSchema(updateUserSchema), updateUser);

/**
 * @openapi
 * /api/users/{nickName}:
 *   delete:
 *     summary: Eliminar usuario
 *     parameters:
 *     - in: path
 *       name: nickName
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       204:
 *         description: Usuario eliminado
 */
router.delete('/:nickName', deleteUser);

/**
 * @openapi
 * /api/users/{nickName}/posts:
 *   get:
 *     summary: Obtener posts de un usuario
 *     parameters:
 *     - in: path
 *       name: nickName
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Lista de posts
 */
router.get('/:nickName/posts', getUserPosts);

/**
 * @openapi
 * /api/users/{nickName}/comments:
 *   get:
 *     summary: Obtener comentarios de un usuario
 *     parameters:
 *     - in: path
 *       name: nickName
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Lista de comentarios
 */
router.get('/:nickName/comments', getUserComments);
module.exports = router;
