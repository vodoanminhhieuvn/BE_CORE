const Joi = require('joi');

const create = {
  body: Joi.object().keys({
    text: Joi.string().required(),
    sentiment: Joi.string().valid('positive', 'negative', 'None'),
  }),
};

module.exports = {
  create,
};
