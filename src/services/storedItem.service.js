const httpStatus = require('http-status');
const { StoredItem } = require('../models');
const ApiError = require('../utils/ApiError');

const createStoredItem = async (itemBody) => {
  if (await StoredItem.isDataTaken(itemBody.modelId, itemBody.data)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Stored item already taken');
  }
  return StoredItem.create(itemBody);
};

const queryStoredItems = async (filter, options) => {
  const items = await StoredItem.paginate(filter, options);
  return items;
};

const getStoredItemById = async (id) => {
  return StoredItem.findById(id);
};

const updateStoredItemById = async (id, updateBody) => {
  const item = await getStoredItemById(id);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stored item not found');
  }
  if (updateBody.name && (await StoredItem.isNameTaken(updateBody.modelId, updateBody.item, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Stored item already taken');
  }
  Object.assign(item, updateBody);
  await item.save();
  return item;
};

const deleteStoredItemById = async (dataId) => {
  const item = await getStoredItemById(dataId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'StoredItem not found');
  }
  await item.remove();
  return item;
};

module.exports = {
  createStoredItem,
  getStoredItemById,
  updateStoredItemById,
  deleteStoredItemById,
  queryStoredItems,
};
