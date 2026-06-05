'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PostTag extends Model {
        static associate(models) {
            PostTag.belongsTo(models.Post, {
                foreignKey: 'post_id',
                as: 'post',
                onDelete: 'CASCADE',
            });
            PostTag.belongsTo(models.Tag, {
                foreignKey: 'tag_id',
                as: 'tag',
                onDelete: 'CASCADE',
            });
        }
    }
    PostTag.init(
        {

        },
        {
            sequelize,
            modelName: 'PostTag',
        }
    );
    return PostTag;
}