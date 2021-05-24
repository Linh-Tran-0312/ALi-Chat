const express = require('express');
const { getProfile, updateProfile, searchAllUsers, searchMembers} = require('../controllers/userController.js');
 
const router = express.Router();

router.get('/:id', getProfile);
router.patch('/', updateProfile);
router.post('/search', searchAllUsers);
router.post('/member/search', searchMembers);

module.exports =  router;