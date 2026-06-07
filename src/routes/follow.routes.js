const { Router } = require('express');
const router = Router();
const { follow, unfollow } = require('../controllers/follow.controller');

router.post('/', follow);
router.delete('/', unfollow);

module.exports = router;
