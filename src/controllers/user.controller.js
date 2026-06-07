const userService = require('../service/userService');
const catchAsync = require('../middlewares/catchAsync');
const { created, success, noContent, ok } = require('../helpers/response');

const createUser = catchAsync(async (req, res) => {
    const newUser = await userService.createUser(req.body);
    return created(res, newUser, '✅ Usuario creado con éxito.');
});

const getUsers = catchAsync(async (req, res) => {
    const users = await userService.getAllUsers();
    return ok(res, users);
});

const getUserByNickName = catchAsync(async (req, res) => {
    const user = await userService.getUserByNickName(req.params.nickName);
    return ok(res, user);
});

const updateUser = catchAsync(async (req, res) => {
    const updatedUser = await userService.updateUser(
        req.params.nickName,
        req.body
    );
    return success(res, updatedUser, 'Usuario actualizado con éxito.');
});

const deleteUser = catchAsync(async (req, res) => {
    await userService.deleteUser(req.params.nickName);
    return noContent(res);
});

const getUserPosts = catchAsync(async (req, res) => {
    const posts = await userService.getUserPosts(req.params.nickName);
    return ok(res, posts);
});

const getUserComments = catchAsync(async (req, res) => {
    const comments = await userService.getUserComments(req.params.nickName);
    return ok(res, comments);
});

module.exports = {
    createUser,
    getUsers,
    getUserByNickName,
    updateUser,
    deleteUser,
    getUserPosts,
    getUserComments,
};
