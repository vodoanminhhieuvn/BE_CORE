const httpStatus = require('http-status');
const { feedbackService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const create = catchAsync(async (req, res) => {
  const feedback = await feedbackService.create(req.body);
  res.status(httpStatus.CREATED).send(feedback);
});

module.exports = {
  create,
};
