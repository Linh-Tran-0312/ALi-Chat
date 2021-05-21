const express = require('express');
const { getConversationListByUserId, getConversationById, updateConversation } = require('../controllers/conversationController.js');
const { getAllMessagesByConversationId, createMessage } = require('../controllers/messageController');
const router = express.Router();

router.get('/conversations', getConversationListByUserId);
router.get('/conversation/:id', getConversationById);
router.patch('/conversation', updateConversation);

router.get('/messages/:id', getAllMessagesByConversationId);
router.post('/message', createMessage)

module.exports = router;