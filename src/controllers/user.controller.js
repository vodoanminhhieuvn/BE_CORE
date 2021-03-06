const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const create = catchAsync(async (req, res) => {
  const user = await userService.create(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getItems = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.query(filter, options);
  res.send(result);
});

const getById = catchAsync(async (req, res) => {
  const user = await userService.getById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateById = catchAsync(async (req, res) => {
  const user = await userService.updateById(req.params.id, req.body);
  res.send(user);
});

const deleteById = catchAsync(async (req, res) => {
  await userService.deleteById(req.params.id);
  res.status(httpStatus.OK).send('Delete Successfully');
});

module.exports = {
  create,
  getItems,
  getById,
  updateById,
  deleteById,
};
