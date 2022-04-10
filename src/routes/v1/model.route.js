const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { modelValidation } = require('../../validations');
const { modelController } = require('../../controllers');
const { modelVerify, canCreateModel } = require('../../permissions/model.permission');

const router = express.Router();

router
  .route('/')
  .post(auth, validate(modelValidation.createModel), canCreateModel, modelController.createModel)
  .get(auth, modelVerify, validate(modelValidation.getModels), modelController.getModels);

router
  .route('/:modelId')
  .get(auth, modelVerify, validate(modelValidation.getModel), modelController.getModel)
  .put(auth, modelVerify, validate(modelValidation.updateModel), modelController.updateModel)
  .delete(auth, modelVerify, validate(modelValidation.deleteModel), modelController.deleteModel);

module.exports = router;
