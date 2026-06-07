const followService = require('../service/followService');
const catchAsync = require('../middlewares/catchAsync');
const { ok } = require('../helpers/response');

const follow = catchAsync(async (req, res) => {
    const result = await followService.follow(
        req.body.follower_nickName,
        req.body.following_nickName
    );
    return ok(res, result);
});

const unfollow = catchAsync(async (req, res) => {
    const result = await followService.unfollow(
        req.body.follower_nickName,
        req.body.following_nickName
    );
    return ok(res, result);
});

module.exports = { follow, unfollow };
