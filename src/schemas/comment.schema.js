const Joi = require('joi');

const createCommentSchema = Joi.object({
    content: Joi.string().trim().min(1).max(500).required().messages({
        'string.base': 'El contenido debe ser un texto',
        'string.empty': 'El comentario no puede estar vacío',
        'any.required': 'El contenido del comentario no puede estar vacío'
    }),
    user_nickName: Joi.string().trim().min(2).max(100).required().messages({
        'string.base': 'El nick name debe ser un texto',
        'string.empty': 'El campo nick name no puede estar vacío',
        'string.min': 'El campo nick name debe tener al menos 2 carácteres',
        'any.required': 'El campo nick name es obligatorio'
    }),
    post_id: Joi.number().integer().required().messages({
    'number.base': 'El ID del post debe ser un número',
    'any.required': 'Cada post debe tener un ID válido'
    })
});

module.exports = { createCommentSchema };