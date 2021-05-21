const express = require('express');
const { getProfile, updateProfile, searchAllUsers} = require('../controllers/userController.js');
 
const router = express.Router();

router.get('/:id', getProfile);
router.patch('/', updateProfile);
router.post('/search', searchAllUsers);

module.exports =  router;