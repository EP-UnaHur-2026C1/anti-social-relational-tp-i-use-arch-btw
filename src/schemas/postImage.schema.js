const Joi = require('joi');

const createPostImageSchema = Joi.object({
    url: Joi.string().uri().required().messages({
        'string.base': 'El contenido debe ser un texto',
        'string.empty': 'La URL no puede estar vacío',
        'string.uri': 'La URL ingresada no es válida',
        'any.required': 'El contenido la URL no puede estar vacío'
    }),
    post_id: Joi.number().integer().required().messages({
    'number.base': 'El ID del post debe ser un número',
    'any.required': 'Cada post debe tener un ID válido'
    })
});

module.exports = { createPostImageSchema };