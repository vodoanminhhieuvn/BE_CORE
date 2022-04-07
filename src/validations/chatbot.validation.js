const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createChatbot = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    slots: Joi.object().required(),
    configs: Joi.object().required(),
  }),
};

const getChatbots = {
  query: Joi.object().keys({
    name: Joi.string(),
    creatorId: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getChatbot = {
  params: Joi.object().keys({
    chatbotId: Joi.string().custom(objectId),
  }),
};

const updateChatbot = {
  params: Joi.object().keys({
    chatbotId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      creatorId: Joi.custom(objectId),
      slots: Joi.object(),
      configs: Joi.object(),
    })
    .min(1),
};

const deleteChatbot = {
  params: Joi.object().keys({
    chatbotId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createChatbot,
  getChatbots,
  getChatbot,
  updateChatbot,
  deleteChatbot,
};