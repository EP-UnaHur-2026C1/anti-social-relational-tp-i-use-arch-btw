const { User} = require('../models');
//extra 
const getUserPosts = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.nickName, {
            include: 'posts',
        });

        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json(user.posts);

    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener posts',
            error: error.message,
        });
    }
}

const getUserComments = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.nickName, {
            include: 'comments',
        });
        
        if(!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json(user.comments);
        
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener comments',
            error: error.message,
        });
    }
}

//CRUD
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener usuarios.',
            error: error.message,
        });
    }
};

const getUserByNickName = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.nickName);

        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado',
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener usuario.',
            error: error.message,
        });
    }
};

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json(user);
    } catch(error) {
        res.status(500).json({
            message: 'Error al crear usuario.',
            error: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.nickName);

        if(!user) {
            return res.status(404).json({
                message: 'usuario no encontrado.'
            });
        }

        await user.update(req.body);

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar usuario.',
            error: error.message,
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.nickName);

        if(!user) {
            return res.status(404).json({
                message: 'usuario no encontrado.'
            });
        }
        await user.destroy();
        res.status(204).send();

    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar usuario.',
            error: error.message,
        });
    }
}




module.exports = {
    getAllUsers,
    getUserByNickName,
    deleteUser,
    createUser,
    updateUser,
    getUserPosts,
    getUserComments,
};