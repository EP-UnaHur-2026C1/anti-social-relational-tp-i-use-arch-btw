'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post_Images extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Post_Images.init(
        {
            url_image: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Post_Images',
        }
    );
    return Post_Images;
};
