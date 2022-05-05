const { Feedback } = require('../models');

const create = async (feedbackBody) => {
  return Feedback.create(feedbackBody);
};

const query = async (filter, options) => {
  const feedbacks = await Feedback.paginate(filter, options);
  return feedbacks;
};

module.exports = {
  create,
  query,
};
