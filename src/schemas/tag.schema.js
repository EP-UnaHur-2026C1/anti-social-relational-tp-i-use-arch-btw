const Joi = require('joi');

const createTagSchema = Joi.object({
    name: Joi.string().trim().min(2).max(30).required().messages({
        'string.base': 'El nombre de la etiqueta debe ser un texto',
        'string.empty': 'El nombre de la etiqueta no puede estar vacío',
        'string.min': 'El nombre de la etiqueta debe tener al menos 2 caracteres',
        'string.max': 'El nombre de la etiqueta no puede superar los 30 caracteres',
        'any.required': 'El nombre de la etiqueta es obligatorio'
    })
});

module.exports = { createTagSchema };