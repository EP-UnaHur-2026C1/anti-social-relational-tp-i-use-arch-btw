const Joi = require('joi');

const createPostSchema = Joi.object({
    description: Joi.string().trim().min(1).required().messages({
        'string.empty': 'La descripción es obligatoria para realizar una publicación',
        'any.required': 'La descripción es obligatoria'
    }),
    user_nickName: Joi.string().trim().min(2).max(100).required().messages({
        'string.base': 'El nick name debe ser un texto',
        'string.empty': 'El campo nick name no puede estar vacío',
        'string.min': 'El campo nick name debe tener al menos 2 carácteres',
        'any.required': 'El campo nick name es obligatorio'
    }),
    images: Joi.array().items(Joi.string().uri()).optional().messages({
        'string.uri': 'Cada imagen debe ser una URL válida'
    }),
    
    tags: Joi.array().items(Joi.string().trim().min(2)).optional().messages({
        'string.min': 'El nombre de la etiqueta no puede estar vacío'
    })
});

module.exports = { createPostSchema };