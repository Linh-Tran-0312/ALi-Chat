const express = require('express');
const { getProfile, updateProfile, searchAllUsers, searchMembers, updateAvatar} = require('../controllers/userController.js');
const upload = require('../utils/multer');
const router = express.Router();

router.get('/:id', getProfile);
router.patch('/', updateProfile);
router.post('/search', searchAllUsers);
router.post('/member/search', searchMembers);
router.post('/updateAvatar', upload.single("avatar"),updateAvatar )

module.exports =  router;