'use strict';
const { Model} = require('sequelize');
const post = require('./post');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            Comment.belongsTo(models.User, {
                foreignKey: 'user_nickName',
                as: 'user',
            });
            Comment.belongsTo(models.Post, {
                foreignKey: 'post_id',
                as: 'post'
            })
        }
    }
    Comment.init(
        {
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            dateTime: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            visible: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            user_nickName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            post_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelname: 'Comment',
        }

    );
    return Comment;
}
