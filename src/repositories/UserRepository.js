const { Op } = require('sequelize');
const { User } = require('../models');

class UserRepository {
    async searchByNicknameOrEmail(nickName, email) {
        const user = await User.findOne({
            where: {
                [Op.or]: [{ nickName: nickName }, { email: email }],
            },
        });

        return user;
    }

    async create(userData) {
        const newUser = await User.create(userData);
        return newUser.toJSON();
    }

    async getTotalUsers() {
        const users = await User.findAll({
            attributes: ['nickName', 'email', 'name'],
        });

        return users;
    }

    async findByNickName(nickName) {
        const user = await User.findByPk(nickName);
        return user;
    }

    async updateByNickName(nickName, userData) {
        const user = await User.findByPk(nickName);

        if (!user) {
            return null;
        }

        await user.update(userData);
        return user.toJSON();
    }

    async deleteByNickName(nickName) {
        const user = await User.findByPk(nickName);

        if (!user) {
            return null;
        }

        await user.destroy();
        return true;
    }

    async getUserPosts(nickName) {
        const user = await User.findByPk(nickName, {
            include: 'posts',
        });

        return user;
    }

    async getUserComments(nickName) {
        const user = await User.findByPk(nickName, {
            include: 'comments',
        });

        return user;
    }
}

module.exports = new UserRepository();