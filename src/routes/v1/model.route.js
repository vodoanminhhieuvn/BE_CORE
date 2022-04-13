const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { modelValidation } = require('../../validations');
const { modelController } = require('../../controllers');
const { canCreateModel, canViewModels, verifyModel } = require('../../permissions/model.permission');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(modelValidation.createModel), canCreateModel, modelController.createModel)
  .get(auth(), validate(modelValidation.getModels), canViewModels, modelController.getModels);

router
  .route('/:modelId')
  .get(auth(), validate(modelValidation.getModel), verifyModel, modelController.getModel)
  .put(auth(), validate(modelValidation.updateModel), verifyModel, modelController.updateModel)
  .delete(auth(), validate(modelValidation.deleteModel), verifyModel, modelController.deleteModel);

module.exports = router;
