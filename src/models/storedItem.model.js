const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const storedItemSchema = mongoose.Schema(
  {
    modelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Model',
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
storedItemSchema.plugin(toJSON);
storedItemSchema.plugin(paginate);

storedItemSchema.statics.isDataTaken = async function (modelId, item, excludeItemId) {
  const prefix = 'data.';
  const data = Object.assign({}, ...Object.keys(item).map((key) => ({ [prefix + key]: item[key] })));
  const result = await this.findOne({ modelId, ...data, _id: { $ne: excludeItemId } });
  return !!result;
};

/**
 * @typedef StoredItem
 */
const StoredItem = mongoose.model('StoredItem', storedItemSchema);

module.exports = StoredItem;
