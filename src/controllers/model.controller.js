const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { modelService } = require('../services');

const createModel = catchAsync(async (req, res) => {
  const model = await modelService.createModel(req.body);
  res.status(httpStatus.CREATED).send(model);
});

const getModels = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'chatbotId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await modelService.queryModels(filter, options);
  res.send(result);
});

const getModel = catchAsync(async (req, res) => {
  const model = await modelService.getModelById(req.params.modelId);
  if (!model) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Model not found');
  }
  res.send(model);
});

const updateModel = catchAsync(async (req, res) => {
  const model = await modelService.updateModelById(req.params.modelId, req.body);
  res.send(model);
});

const deleteModel = catchAsync(async (req, res) => {
  await modelService.deleteModelById(req.params.modelId);
  res.status(httpStatus.OK).send('Delete Successfully');
});

module.exports = {
  createModel,
  getModels,
  getModel,
  updateModel,
  deleteModel,
};
