const userService = require('../service/userService');

const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);

        return res.status(201).json({
            message: '✅ Usuario creado con éxito.',
            data: newUser,
        });
    } catch (error) {
        if (error.message.includes('ya están registrados')) {
            return res.status(409).json({ error: error.message });
        }

        console.error(error);
        return res.status(500).json({
            error: 'Hubo un error en el servidor.',
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener a los usuarios.',
        });
    }
};

const getUserByNickName = async (req, res) => {
    try {
        const user = await userService.getUserByNickName(req.params.nickName);
        return res.status(200).json(user);
    } catch (error) {
        if (error.message.includes('Usuario no encontrado')) {
            return res.status(404).json({ error: error.message });
        }

        return res.status(500).json({
            error: 'Error al obtener usuario.',
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(
            req.params.nickName,
            req.body
        );

        return res.status(200).json({
            message: 'Usuario actualizado con éxito.',
            data: updatedUser,
        });
    } catch (error) {
        if (error.message.includes('Usuario no encontrado')) {
            return res.status(404).json({ error: error.message });
        }

        return res.status(500).json({
            error: 'Error al actualizar usuario.',
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.nickName);
        return res.status(204).send();
    } catch (error) {
        if (error.message.includes('Usuario no encontrado')) {
            return res.status(404).json({ error: error.message });
        }

        return res.status(500).json({
            error: 'Error al eliminar usuario.',
        });
    }
};

const getUserPosts = async (req, res) => {
    try {
        const posts = await userService.getUserPosts(req.params.nickName);
        return res.status(200).json(posts);
    } catch (error) {
        if (error.message.includes('Usuario no encontrado')) {
            return res.status(404).json({ error: error.message });
        }

        return res.status(500).json({
            error: 'Error al obtener posts del usuario.',
        });
    }
};

const getUserComments = async (req, res) => {
    try {
        const comments = await userService.getUserComments(req.params.nickName);
        return res.status(200).json(comments);
    } catch (error) {
        if (error.message.includes('Usuario no encontrado')) {
            return res.status(404).json({ error: error.message });
        }

        return res.status(500).json({
            error: 'Error al obtener comentarios del usuario.',
        });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserByNickName,
    updateUser,
    deleteUser,
    getUserPosts,
    getUserComments,
};
