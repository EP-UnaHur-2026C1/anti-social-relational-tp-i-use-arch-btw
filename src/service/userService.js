const AppError = require('../helpers/AppError');
const UserRepository = require('../repositories/UserRepository');

class UserService {
    async createUser(userData) {
        const existingUser = await UserRepository.searchByNicknameOrEmail(
            userData.nickName,
            userData.email
        );

        if (existingUser) {
            throw new AppError(
                'El nickName o el email ya están registrados.',
                409
            );
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
            throw new AppError('Usuario no encontrado.', 404);
        }

        return user;
    }

    async updateUser(nickName, userData) {
        const updatedUser = await UserRepository.updateByNickName(
            nickName,
            userData
        );

        if (!updatedUser) {
            throw new AppError('Usuario no encontrado.', 404);
        }

        return updatedUser;
    }

    async deleteUser(nickName) {
        const deletedUser = await UserRepository.deleteByNickName(nickName);

        if (!deletedUser) {
            throw new AppError('Usuario no encontrado.', 404);
        }

        return deletedUser;
    }

    async getUserPosts(nickName) {
        const user = await UserRepository.getUserPosts(nickName);

        if (!user) {
            throw new AppError('Usuario no encontrado.', 404);
        }

        return user.posts || [];
    }

    async getUserComments(nickName) {
        const user = await UserRepository.getUserComments(nickName);

        if (!user) {
            throw new AppError('Usuario no encontrado.', 404);
        }

        return user.comments || [];
    }
}

module.exports = new UserService();
