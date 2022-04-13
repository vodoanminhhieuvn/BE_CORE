const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createStoredItem = {
  body: Joi.object().keys({
    modelId: Joi.string().required(),
    data: Joi.object().required(),
  }),
};

const getStoredItems = {
  query: Joi.object().keys({
    modelId: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
  body: Joi.object().keys({
    data: Joi.object(),
  }),
};

const getStoredItem = {
  params: Joi.object().keys({
    storedItemId: Joi.string().required().custom(objectId),
  }),
};

const updateStoredItem = {
  params: Joi.object().keys({
    storedItemId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      modelId: Joi.string(),
      data: Joi.object(),
    })
    .min(1),
};

const deleteStoredItem = {
  params: Joi.object().keys({
    storedItemId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createStoredItem,
  getStoredItems,
  getStoredItem,
  updateStoredItem,
  deleteStoredItem,
};
