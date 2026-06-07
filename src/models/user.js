'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Comment, {
                foreignKey: 'user_nickName',
                onDelete: 'CASCADE',
                as: 'comments',
            });
            User.hasMany(models.Post, {
                foreignKey: 'user_nickName',
                onDelete: 'CASCADE',
                as: 'posts',
            });
            User.belongsToMany(models.User, {
                through: models.Follow,
                foreignKey: 'following_nickName',
                otherKey: 'follower_nickName',
                as: 'followerUsers',
            });
            User.belongsToMany(models.User, {
                through: models.Follow,
                foreignKey: 'follower_nickName',
                otherKey: 'following_nickName',
                as: 'following',
            });
        }
    }
    User.init(
        {
            nickName: {
                type: DataTypes.STRING,
                primaryKey: true,
                autoIncrement: false,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            surname: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            followers: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
    return User;
};
