const httpStatus = require('http-status');
const { Chatbot } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a chatbot
 * @param {Object} chatbotBody
 * @returns {Promise<Chatbot>}
 */
const create = async (chatbotBody) => {
  if (await Chatbot.isNameTaken(chatbotBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Chatbot name already taken');
  }
  return Chatbot.create(chatbotBody);
};

/**
 * Query for chatbots
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const query = async (filter, options) => {
  const chatbots = await Chatbot.paginate(filter, options);
  return chatbots;
};

/**
 * Get chatbot by id
 * @param {ObjectId} id
 * @returns {Promise<Chatbot>}
 */
const getById = async (id) => {
  return Chatbot.findById(id);
};

/**
 * Get chatbot by name
 * @param {string} name
 * @returns {Promise<Chatbot>}
 */
const getByName = async (name) => {
  return Chatbot.findOne({ name });
};

/**
 * Update chatbot by id
 * @param {ObjectId} chatbotId
 * @param {Object} updateBody
 * @returns {Promise<Chatbot>}
 */
const updateById = async (id, updateBody) => {
  const chatbot = await getById(id);
  if (!chatbot) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chatbot not found');
  }
  if (updateBody.name && (await Chatbot.isNameTaken(updateBody.name, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  Object.assign(chatbot, updateBody);
  await chatbot.save();
  return chatbot;
};

/**
 * Delete chatbot by id
 * @param {ObjectId} ChatbotId
 * @returns {Promise<Chatbot>}
 */
const deleteById = async (ChatbotId) => {
  const chatbot = await getById(ChatbotId);
  if (!chatbot) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chatbot not found');
  }
  await chatbot.remove();
  return chatbot;
};

module.exports = {
  create,
  getById,
  getByName,
  updateById,
  deleteById,
  query,
};
