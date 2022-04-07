const express = require('express');
const validate = require('../../middlewares/validate');
const chatbotAuth = require('../../middlewares/chatbot.auth');
const { chatbotValidation } = require('../../validations');
const { chatbotController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(chatbotAuth(), validate(chatbotValidation.createChatbot), chatbotController.createChatbot)
  .get(chatbotAuth('getChatbots'), validate(chatbotValidation.getChatbots), chatbotController.getChatbots);

router
  .route('/:chatbotId')
  .get(chatbotAuth('getChatbots'), validate(chatbotValidation.getChatbot), chatbotController.getChatbot)
  .put(chatbotAuth('manageChatbots'), validate(chatbotValidation.updateChatbot), chatbotController.updateChatbot)
  .delete(chatbotAuth('manageChatbots'), validate(chatbotValidation.deleteChatbot), chatbotController.deleteChatbot);

module.exports = router;
