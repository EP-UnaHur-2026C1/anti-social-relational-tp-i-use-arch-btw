const Joi = require('joi');

const addPostImageSchema = Joi.object({
    url: Joi.string().uri().required().messages({
        'string.base': 'La URL debe ser un texto',
        'string.empty': 'La URL no puede estar vacía',
        'string.uri': 'La URL ingresada no es válida',
        'any.required': 'La URL es obligatoria',
    }),
});

module.exports = { addPostImageSchema };
