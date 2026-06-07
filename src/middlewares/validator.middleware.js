const validateSchema = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            const errFormated = error.details.map((err) => err.message);
            return res.status(400).json({ errores: errFormated });
        }
        req.body = value;
        next();
    };
};

module.exports = validateSchema;
