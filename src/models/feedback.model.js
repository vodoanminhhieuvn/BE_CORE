const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const feedbackSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  sentiment: {
    type: String,
  },
});

feedbackSchema.plugin(toJSON);
feedbackSchema.plugin(paginate);

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
