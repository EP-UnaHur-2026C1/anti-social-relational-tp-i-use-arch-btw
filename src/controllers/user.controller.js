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
        return res.status(500).json({ error: 'Hubo un error en el servidor.' });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        return res
            .status(500)
            .json({ error: 'Error al obtener a los usuarios.' });
    }
};

module.exports = { createUser, getUsers };
