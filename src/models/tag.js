'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tag extends Model {
        static associate(models) {
            Tag.hasMany(models.PostTag, {
                foreignKey: 'tag_id',
                as: 'postTags',
                onDelete: 'CASCADE',
            });
            Tag.belongsToMany(models.Post, {
                through: models.PostTag,
                foreignKey: 'tag_id',
                otherKey: 'post_id',
                as: 'posts',
            });
        }
    }
    Tag.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        {
            sequelize,
            modelName: 'Tag',
        }
    );
    return Tag;
};
