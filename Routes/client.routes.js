const express = require('express');
const router = express.Router();

const clientsController = require('../Controllers/client.controller');

router.get('/', clientsController.getList);
router.post('/', clientsController.create);
router.get('/clientsAmount', clientsController.getClientsAmount);
router.get('/:id', clientsController.get);
router.put('/:UserId', clientsController.edit);
router.put('/editClientAmount/:id', clientsController.editClientAmount);
router.post('/postChargesToClients', clientsController.postChargesToClients);

router.delete('/:id', clientsController.delete);

module.exports = router;