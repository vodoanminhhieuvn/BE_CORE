const express = require('express');
const { feedbackController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { feedbackValidation } = require('../../validations');

const router = express.Router();

router.post('/', validate(feedbackValidation.create), feedbackController.create);

module.exports = router;
