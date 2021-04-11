const express = require ('express');
const authController = require('../controllers/auth');

const router = express.Router();

//STUDENT

router.post('/register', authController.register);

router.post('/login', authController.login);

//ADMIN

router.post('/registerAdmin', authController.registerAdmin);

router.post('/loginAdmin', authController.loginAdmin);

// mainTest

router.post('/mainTest', authController.mainTest);

//LOGOUT

router.get('/logout', authController.logout);

module.exports = router;