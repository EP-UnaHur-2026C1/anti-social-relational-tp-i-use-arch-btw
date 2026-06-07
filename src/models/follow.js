'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Follow extends Model {
        static associate(models) {
            Follow.belongsTo(models.User, {
                foreignKey: 'follower_nickName',
                as: 'follower',
                onDelete: 'CASCADE',
            });
            Follow.belongsTo(models.User, {
                foreignKey: 'following_nickName',
                as: 'following',
                onDelete: 'CASCADE',
            });
        }
    }
    Follow.init(
        {
            follower_nickName: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
            },
            following_nickName: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Follow',
        }
    );
    return Follow;
};
