const errorHandler = (err, req, res, next) => {
    console.error(err);
    return res.status(err.status || 500).json({ error: err.message });
};

module.exports = errorHandler;
