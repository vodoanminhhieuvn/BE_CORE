const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { chatbotService } = require('../services');

const createChatbot = catchAsync(async (req, res) => {
  req.body.creatorId = req.user.id;
  const chatbot = await chatbotService.createChatbot(req.body);
  res.status(httpStatus.CREATED).send(chatbot);
});

const getChatbots = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'creatorId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await chatbotService.queryChatbots(filter, options);
  res.send(result);
});

const getChatbot = catchAsync(async (req, res) => {
  const chatbot = await chatbotService.getChatbotById(req.params.chatbotId);
  if (!chatbot) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chatbot not found');
  }
  res.send(chatbot);
});

const updateChatbot = catchAsync(async (req, res) => {
  const chatbot = await chatbotService.updateChatbotById(req.params.chatbotId, req.body);
  res.send(chatbot);
});

const deleteChatbot = catchAsync(async (req, res) => {
  await chatbotService.deleteChatbotById(req.params.chatbotId);
  res.status(httpStatus.OK).send('Delete Successfully');
});

module.exports = {
  createChatbot,
  getChatbots,
  getChatbot,
  updateChatbot,
  deleteChatbot,
};
