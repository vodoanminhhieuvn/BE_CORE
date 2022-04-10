const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createModel = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    chatbotId: Joi.string().required(),
    schema: Joi.object().required(),
  }),
};

const getModels = {
  query: Joi.object().keys({
    name: Joi.string(),
    chatbotId: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getModel = {
  params: Joi.object().keys({
    modelId: Joi.string().required().custom(objectId),
  }),
};

const updateModel = {
  params: Joi.object().keys({
    modelId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      chatbotId: Joi.string(),
      schema: Joi.object(),
    })
    .min(1),
};

const deleteModel = {
  params: Joi.object().keys({
    modelId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createModel,
  getModels,
  getModel,
  updateModel,
  deleteModel,
};
