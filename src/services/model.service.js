const httpStatus = require('http-status');
const { Model } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a model
 * @param {Object} modelBody
 * @returns {Promise<Model>}
 */
const createModel = async (modelBody) => {
  if (await Model.isNameTaken(modelBody.name, modelBody.chatbotId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Model name already taken');
  }
  return Model.create(modelBody);
};

/**
 * Query for models
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryModels = async (filter, options) => {
  const models = await Model.paginate(filter, options);
  return models;
};

/**
 * Get model by id
 * @param {ObjectId} id
 * @returns {Promise<Model>}
 */
const getModelById = async (id) => {
  return Model.findById(id);
};

/**
 * Update model by id
 * @param {ObjectId} modelId
 * @param {Object} updateBody
 * @returns {Promise<Model>}
 */
const updateModelById = async (id, updateBody) => {
  const model = await getModelById(id);
  if (!model) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Model not found');
  }
  if (updateBody.name && (await Model.isNameTaken(updateBody.name, updateBody.chatbotId, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Model name already taken');
  }
  Object.assign(model, updateBody);
  await model.save();
  return model;
};

/**
 * Delete model by id
 * @param {ObjectId} modelId
 * @returns {Promise<Model>}
 */
const deleteModelById = async (modelId) => {
  const model = await getModelById(modelId);
  if (!model) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Model not found');
  }
  await model.remove();
  return model;
};

module.exports = {
  createModel,
  getModelById,
  updateModelById,
  deleteModelById,
  queryModels,
};
