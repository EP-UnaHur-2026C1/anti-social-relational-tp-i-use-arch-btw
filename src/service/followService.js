const AppError = require('../helpers/AppError');
const FollowRepository = require('../repositories/FollowRepository');
const { User } = require('../models');

class FollowService {
    async follow(followerNickName, followingNickName) {
        if (followerNickName === followingNickName) {
            throw new AppError('No podés seguirte a vos mismo.', 400);
        }

        const followingUser = await User.findByPk(followingNickName);
        if (!followingUser) {
            throw new AppError('Usuario a seguir no encontrado.', 404);
        }

        const followerUser = await User.findByPk(followerNickName);
        if (!followerUser) {
            throw new AppError('Tu usuario no existe.', 404);
        }

        const existingFollow = await FollowRepository.findOne(
            followerNickName,
            followingNickName
        );

        if (existingFollow) {
            throw new AppError('Ya seguís a este usuario.', 409);
        }

        await FollowRepository.create(followerNickName, followingNickName);
        await followingUser.increment('followers');
        return { message: `✅ Ahora seguís a ${followingNickName}.` };
    }

    async unfollow(followerNickName, followingNickName) {
        const deleted = await FollowRepository.delete(
            followerNickName,
            followingNickName
        );
        if (!deleted) {
            throw new AppError('No seguís a este usuario.', 404);
        }

        const followingUser = await User.findByPk(followingNickName);
        if (followingUser) {
            await followingUser.decrement('followers');
        }
        return {
            message: `✅ Dejaste de seguir seguir a ${followingNickName}.`,
        };
    }
}

module.exports = new FollowService();
