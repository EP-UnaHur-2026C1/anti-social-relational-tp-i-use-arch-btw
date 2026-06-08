const { Router } = require('express');
const router = Router();
const { follow, unfollow } = require('../controllers/follow.controller');

/**
 * @openapi
 * /api/follows:
 *   post:
 *     summary: Seguir a un usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               follower_nickName:
 *                 type: string
 *               following_nickName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario seguido correctamente
 */
router.post('/', follow);

/**
 * @openapi
 * /api/follows:
 *   delete:
 *     summary: Dejar de seguir a un usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               follower_nickName:
 *                 type: string
 *               following_nickName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dejaste de seguir al usuario
 */
router.delete('/', unfollow);

module.exports = router;
