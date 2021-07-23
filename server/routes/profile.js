const express = require('express');
const { updateProfile, searchAllUsers, searchMembers, updateAvatar} = require('../controllers/userController.js');
const router = express.Router();

router.patch('/update/:id',updateProfile)
router.post('/search', searchAllUsers);
router.post('/member/search', searchMembers);
router.post('/update-avatar/:id',updateAvatar );

module.exports =  router;