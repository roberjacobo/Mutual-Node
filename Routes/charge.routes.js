const express = require('express');
const router = express.Router();

const chargesController = require('../Controllers/charge.controller');

router.get('/', function(req, res, next){
    return chargesController.getList(req, res, next);
});

router.post('/', chargesController.create);
router.get('/:id', chargesController.get);
router.put('/:id', chargesController.edit);
router.delete('/:id', chargesController.delete);

module.exports = router;