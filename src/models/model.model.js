const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const modelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    chatbotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chatbot',
      required: true,
    },
    schema: {
      type: Object,
    },
  },
  { timestamps: true }
);

modelSchema.index({ name: 1, chatbotId: 1 }, { unique: true });

// add plugin that converts mongoose to json
modelSchema.plugin(toJSON);
modelSchema.plugin(paginate);

/**
 * Check if model is taken
 * @param {string} name - The model's name
 * @param {string} chatbotId - The models's chatbot id
 * @param {ObjectId} [excludeModelId] - The id of the model to be excluded
 * @returns {Promise<boolean>}
 */
modelSchema.statics.isNameTaken = async function (name, chatbotId, excludeChatbotId) {
  const chatbot = await this.findOne({ name, chatbotId, _id: { $ne: excludeChatbotId } });
  return !!chatbot;
};

/**
 * @typedef Model
 */
const Model = mongoose.model('Model', modelSchema);

module.exports = Model;
