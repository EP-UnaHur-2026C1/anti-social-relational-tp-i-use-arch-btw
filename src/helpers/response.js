const success = (res, data, message, status = 200) =>
    res.status(status).json({ message, data });

const created = (res, data, message) => res.status(201).json({ message, data });

const noContent = (res) => res.status(204).send();

const ok = (res, data) => res.status(200).json(data);

module.exports = { success, created, noContent, ok };
