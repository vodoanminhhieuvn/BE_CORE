const httpStatus = require('http-status');
const { Model, Chatbot } = require('../models');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const modelVerify = catchAsync(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    if (!req.params.modelId) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    }
    const model = await Model.findById(req.params.modelId).populate('chatbotId');
    if (!model) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Model not found');
    }
    const chatbot = model.chatbotId;
    if (!chatbot || chatbot.creatorId !== req.user.id) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    }
  }
  return next();
});

const canCreateModel = catchAsync(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    const chatbot = await Chatbot.findById(req.body.chatbotId);
    if (!chatbot || chatbot.creatorId !== req.user.id) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    }
  }
  return next();
});

module.exports = { modelVerify, canCreateModel };
