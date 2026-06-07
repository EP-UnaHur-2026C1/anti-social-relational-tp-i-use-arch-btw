const { Follow } = require('../models');

class FollowRepository {
    async create(followerNickName, followingNickName) {
        const follow = await Follow.create({
            follower_nickName: followerNickName,
            following_nickName: followingNickName,
        });
        return follow;
    }

    async delete(followerNickName, followingNickName) {
        const follow = await Follow.findOne({
            where: {
                follower_nickName: followerNickName,
                following_nickName: followingNickName,
            },
        });
        if (!follow) {
            return null;
        }
        await follow.destroy();
        return true;
    }

    async findOne(followerNickName, followingNickName) {
        const follow = await Follow.findOne({
            where: {
                follower_nickName: followerNickName,
                following_nickName: followingNickName,
            },
        });
        return follow;
    }
}

module.exports = new FollowRepository();
