const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/userController');
const { AuthRequestValidator } = require('../../middlewares/index');

router.post('/signup',  AuthRequestValidator.validateUserAuth,UserController.create,);
router.post('/signin',  AuthRequestValidator.validateUserAuth,UserController.signIn);

module.exports = router;