const UserRepository = require('../repositories/UserRepository');

class UserService {
    async createUser(userData) {
        const existingUser = await UserRepository.searchByNicknameOrEmail(
            userData.nickName,
            userData.email
        );

        if (existingUser) {
            throw new Error('El nickName o el email ya están registrados.');
        }

        const newUser = await UserRepository.create(userData);
        return newUser;
    }

    async getAllUsers() {
        const users = await UserRepository.getTotalUsers();
        return users;
    }

    async getUserByNickName(nickName) {
        const user = await UserRepository.findByNickName(nickName);

        if (!user) {
            throw new Error('Usuario no encontrado.');
        }

        return user;
    }

    async updateUser(nickName, userData) {
        const updatedUser = await UserRepository.updateByNickName(
            nickName,
            userData
        );

        if (!updatedUser) {
            throw new Error('Usuario no encontrado.');
        }

        return updatedUser;
    }

    async deleteUser(nickName) {
        const deletedUser = await UserRepository.deleteByNickName(nickName);

        if (!deletedUser) {
            throw new Error('Usuario no encontrado.');
        }

        return deletedUser;
    }

    async getUserPosts(nickName) {
        const user = await UserRepository.getUserPosts(nickName);

        if (!user) {
            throw new Error('Usuario no encontrado.');
        }

        return user.posts || [];
    }

    async getUserComments(nickName) {
        const user = await UserRepository.getUserComments(nickName);

        if (!user) {
            throw new Error('Usuario no encontrado.');
        }

        return user.comments || [];
    }
}

module.exports = new UserService();
