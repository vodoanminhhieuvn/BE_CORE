const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { storedItemService } = require('../services');
const logger = require('../config/logger');

const createStoredItem = catchAsync(async (req, res) => {
  const item = await storedItemService.createStoredItem(req.body);
  res.status(httpStatus.CREATED).send(item);
});

const getStoredItems = catchAsync(async (req, res) => {
  let filter = pick(req.query, ['modelId']);
  const { data } = pick(req.body, ['data']);
  if (data) {
    const prefix = 'data.';
    const flatData = Object.assign({}, ...Object.keys(data).map((key) => ({ [prefix + key]: data[key] })));
    filter = { ...filter, ...flatData };
  }
  logger.info('%j', filter);

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await storedItemService.queryStoredItems(filter, options);
  res.send(result);
});

const getStoredItem = catchAsync(async (req, res) => {
  const item = await storedItemService.getStoredItemById(req.params.storedItemId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stored item not found');
  }
  res.send(item);
});

const updateStoredItem = catchAsync(async (req, res) => {
  const item = await storedItemService.updateStoredItemById(req.params.storedItemId, req.body);
  res.send(item);
});

const deleteStoredItem = catchAsync(async (req, res) => {
  await storedItemService.deleteStoredItemById(req.params.storedItemId);
  res.status(httpStatus.OK).send('Delete Successfully');
});

module.exports = {
  createStoredItem,
  getStoredItems,
  getStoredItem,
  updateStoredItem,
  deleteStoredItem,
};
