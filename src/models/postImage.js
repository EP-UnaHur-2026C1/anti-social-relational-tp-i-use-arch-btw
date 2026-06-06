'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PostImage extends Model {
        static associate(models) {
            PostImage.belongsTo(models.Post, {
                foreignKey: 'post_id',
                as: 'post',
            });
        }
    }
    PostImage.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            post_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'PostImage',
        }
    );
    return PostImage;
};
