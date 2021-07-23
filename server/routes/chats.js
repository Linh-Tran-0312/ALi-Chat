const express = require('express');
const { getConversationByUserIds, getConversationById, updateConversation } = require('../controllers/conversationController.js');
const { getAllMessagesByConversationId, createMessage } = require('../controllers/messageController');

const router = express.Router();

router.get('/conversation/:id',getConversationByUserIds); 
router.patch('/conversation', updateConversation);
 
module.exports = router;