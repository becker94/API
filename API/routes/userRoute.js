const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');

const { checkUser } = require('../middlewares/checkUser');

router.post('/login', loginController.login);
router.post('/register', userController.register);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUserById);



router.get('/:id', checkUser, userController.getUserById);



module.exports = router;
