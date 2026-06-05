const { User} = require('../models');

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
        
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener usuario.',
            error: error.message,
        });
    }
}