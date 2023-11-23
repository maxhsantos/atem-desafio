const express = require('express');
const router = express.Router();

// Controllers
const transacaoController = require('../controller/transacaoController');

router.post(
    '/transacao/:id',
    transacaoController.criar,
);

router.get(
    '/saldo/:id',
    transacaoController.listarSaldoId,
);

module.exports = router;
