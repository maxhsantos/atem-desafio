const express = require('express');
const router = express.Router();

// Controllers
const clienteController = require('../controller/clienteController');

router.post(
    '/cliente',
    clienteController.criar,
);

router.get(
    '/cliente/:id',
    clienteController.listarPorId,
);

module.exports = router;
