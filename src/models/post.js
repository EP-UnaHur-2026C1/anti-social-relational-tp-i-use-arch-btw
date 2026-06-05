'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            Post.belongsTo(models.User, {
                foreignKey: 'user_nickName',
                as: 'user',
            });

            Post.hasMany(models.Comment, {
                foreignKey: 'post_id',
                as: 'comments',
            });

            Post.hasMany(models.PostImage, {
                foreignKey: 'post_id',
                as: 'images',
            });

            Post.belongsToMany(models.Tag, {
                through: 'PostTags',
                foreignKey: 'post_id',
                otherKey: 'tag_id',
                as: 'tags',
            });
        }
    }

    Post.init(
        {
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            dateTime: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },

            user_nickName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Post',
        }
    );

    return Post;
};