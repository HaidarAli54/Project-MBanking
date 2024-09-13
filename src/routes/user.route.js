const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const userController = new UserController();

const Authentication = require('../middleware/authentication');
const authentication = new Authentication();

router.get('/profile', authentication.verifyToken, userController.findById); 

router.post('/register', userController.create);

router.post('/login', userController.login);

router.get('/verify/:id', userController.verify);

router.patch('/update/:id', authentication.verifyToken, userController.update);

router.delete('/delete/:id', authentication.verifyToken, userController.delete);

module.exports = router;