const UserRepository = require('../repositories/UserRepository');

class UserService {
    async createUser(userData) {
        const existingUser = await UserRepository.searchByNicknameOrEmail(
            userData.nickName,
            userData.email
        );

        if (existingUser)
            throw new Error('El nickName o el email ya están registrados.');

        const newUser = await UserRepository.create(userData);
        return newUser;
    }

    async getAllUsers() {
        const users = await UserRepository.getTotalUsers();
        return users;
    }
}

module.exports = new UserService();
