const Joi = require('joi');

const createUserSchema = Joi.object({
    nickName: Joi.string().trim().min(2).max(100).required().messages({
        'string.base': 'El nick name debe ser un texto',
        'string.empty': 'El campo nick name no puede estar vacío',
        'string.min': 'El campo nick name debe tener al menos 2 carácteres',
        'any.required': 'El campo nick name es obligatorio',
    }),
    email: Joi.string().trim().min(10).max(100).email().required().messages({
        'string.base': 'El email debe ser un texto',
        'string.empty': 'El campo email no puede estar vacío',
        'string.email': 'debe ingresar un correo electrónico válido',
        'any.required': 'El campo email es obligatorio',
    }),
    name: Joi.string().trim().min(2).max(100).required().messages({
        'string.base': 'El nombre debe ser un texto',
        'string.empty': 'El campo nombre no pued estar vacío',
        'string.min': 'El campo nombre debe tener al menos 2 carácteres',
        'any.required': 'El campo nombre es obligatorio',
    }),
    surname: Joi.string().trim().min(5).max(100).optional().messages({
        'string.base': 'El apellido debe ser un texto',
        'string.min': 'El campo apellido debe tener al menos 5 carácteres',
    }),
});

module.exports = { createUserSchema };
