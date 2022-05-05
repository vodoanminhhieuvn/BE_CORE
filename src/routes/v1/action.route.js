const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { actionValidation: validation } = require('../../validations');
const { actionController: controller } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('admin'), validate(validation.create), controller.create)
  .get(auth(), validate(validation.getItems), controller.getItems);

router
  .route('/:id')
  .get(auth(), validate(validation.getById), controller.getById)
  .put(auth('admin'), validate(validation.updateById), controller.updateById)
  .delete(auth('admin'), validate(validation.deleteById), controller.deleteById);

module.exports = router;
