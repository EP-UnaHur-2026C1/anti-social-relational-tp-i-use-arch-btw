const { Router } = require('express');
const { createUser, getUsers } = require('../controllers/user.controller');
const validateSchema = require('../middlewares/validator.middleware');
const { createUserSchema } = require('../schemas/user.schema');
const router = Router();

router.post('/', validateSchema(createUserSchema), createUser);
router.get('/', getUsers);
module.exports = router;
