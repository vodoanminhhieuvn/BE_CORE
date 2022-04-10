const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const userVerify = catchAsync(async (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.id !== req.params.userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  return next();
});

module.exports = userVerify;
