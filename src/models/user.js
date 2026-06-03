'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Comment, {
                foreignKey: 'user_nickName',
                as: 'comment',
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
            name: DataTypes.STRING,
            surname: DataTypes.STRING,
            followers: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
    return User;
};
