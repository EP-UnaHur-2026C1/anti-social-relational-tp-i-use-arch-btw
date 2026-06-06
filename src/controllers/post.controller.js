const { Post } = require('../models');

//CRUD
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: ['user', 'comments', 'images', 'tags'],
        });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener posts',
            error: error.message,
        });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findByPk({
            include: ['user', 'comments', 'images', 'tags'],
        });
        if (!post) {
            return res.status(404).json({
                message: 'Post no encontrado',
            });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener post',
            error: error.message,
        });
    }
};

const createPost = async (req, res) => {
    try {
        const user = await User.findByPk(req.body.user_nickName);

        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado',
            });
        }

        const post = await Post.create(req.body);
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear Post',
            error: error.message,
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: 'Post no encontrado',
            });
        }

        await Post.destroy();
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar Post',
            error: error.message,
        });
    }
};

const updatePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: 'Post no encontrado',
            });
        }

        await post.update(req.body);
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar Post',
            error: error.message,
        });
    }
};

const addPostImage = async (req, res) => {
}

const removePostImage = async (req, res) => {
}

const addPostTag = async (req, res) => {
}

const removePostTag = async (req, res) => {
}

module.exports = {
    updatePost,
    getAllPosts,
    getPostById,
    deletePost,
    createPost,
    addPostImage,
    removePostImage,
    addPostTag,
    removePostTag,
};
