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
}

module.exports = new UserRepository();
