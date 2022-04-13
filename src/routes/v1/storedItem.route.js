const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { storedItemValidation } = require('../../validations');
const { storedItemController } = require('../../controllers');
const { verifyStoredItem, canCreateStoredItem, canViewStoredItems } = require('../../permissions/storedItem.permission');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(storedItemValidation.createStoredItem), canCreateStoredItem, storedItemController.createStoredItem)
  .get(auth(), validate(storedItemValidation.getStoredItems), canViewStoredItems, storedItemController.getStoredItems);

router
  .route('/:storedItemId')
  .get(auth(), validate(storedItemValidation.getStoredItem), verifyStoredItem, storedItemController.getStoredItem)
  .put(auth(), validate(storedItemValidation.updateStoredItem), verifyStoredItem, storedItemController.updateStoredItem)
  .delete(auth(), validate(storedItemValidation.deleteStoredItem), verifyStoredItem, storedItemController.deleteStoredItem);

module.exports = router;
