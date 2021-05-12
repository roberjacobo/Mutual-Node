const express = require('express');
const router = express.Router();

const paymentsController = require('../Controllers/payment.controller');

router.get("/", function (req, res, next) {
  return paymentsController.getList(req, res, next);
});

router.get('/', paymentsController.get);
router.post('/', paymentsController.create);
router.get('/:id', paymentsController.get);
router.put('/:id', paymentsController.edit);
router.delete('/:id', paymentsController.delete);

module.exports = router;