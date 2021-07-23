const express = require('express');
const { signIn, signUp, signInWithGoogle, signInWithFacebook} = require('../controllers/userController.js');
 
const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/google', signInWithGoogle);
router.post('/facebook', signInWithFacebook)



module.exports =  router;