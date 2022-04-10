const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { chatbotValidation } = require('../../validations');
const { chatbotController } = require('../../controllers');
const chatbotVerify = require('../../permissions/chatbot.permission');

const router = express.Router();

router
  .route('/')
  .post(auth, validate(chatbotValidation.createChatbot), chatbotController.createChatbot)
  .get(auth, chatbotVerify, validate(chatbotValidation.getChatbots), chatbotController.getChatbots);

router
  .route('/:chatbotId')
  .get(auth, chatbotVerify, validate(chatbotValidation.getChatbot), chatbotController.getChatbot)
  .put(auth, chatbotVerify, validate(chatbotValidation.updateChatbot), chatbotController.updateChatbot)
  .delete(auth, chatbotVerify, validate(chatbotValidation.deleteChatbot), chatbotController.deleteChatbot);

module.exports = router;
