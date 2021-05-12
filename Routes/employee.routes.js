const express = require('express');
var bcrypt = require('bcryptjs');
const router = express.Router();

const employeesController = require('../Controllers/employee.controller');

router.get('/', employeesController.getList);
router.post('/', employeesController.create);
router.get('/:id', employeesController.get);
router.put('/:id', employeesController.edit);
router.delete('/:id', employeesController.delete);

module.exports = router;
