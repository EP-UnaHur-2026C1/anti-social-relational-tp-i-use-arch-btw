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
router.get('/:nickName', getUserByNickName);
router.put('/:nickName', validateSchema(updateUserSchema), updateUser);
router.delete('/:nickName', deleteUser);
router.get('/:nickName/posts', getUserPosts);
router.get('/:nickName/comments', getUserComments);
module.exports = router;
