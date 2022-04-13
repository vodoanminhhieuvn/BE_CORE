const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { chatbotValidation } = require('../../validations');
const { chatbotController } = require('../../controllers');
const verifyChatbot = require('../../permissions/chatbot.permission');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(chatbotValidation.createChatbot), chatbotController.createChatbot)
  .get(auth('admin'), validate(chatbotValidation.getChatbots), chatbotController.getChatbots);

router.route('/me').get(auth(), validate(chatbotValidation.getMyChatbots), chatbotController.getMyChatbots);

router
  .route('/:chatbotId')
  .get(auth(), validate(chatbotValidation.getChatbot), verifyChatbot, chatbotController.getChatbot)
  .put(auth(), validate(chatbotValidation.updateChatbot), verifyChatbot, chatbotController.updateChatbot)
  .delete(auth(), validate(chatbotValidation.deleteChatbot), verifyChatbot, chatbotController.deleteChatbot);

module.exports = router;
