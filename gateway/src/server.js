const express = require('express');
require('express-group-routes');
const httpProxy = require('express-http-proxy');
const app = express();
const port = 3000;
const {
    CLIENTE_API_URL,
    TRANSACOES_API_URL,
} = require('./urls.js');

const clienteServiceProxy = httpProxy(CLIENTE_API_URL);
const transacoesServiceProxy = httpProxy(TRANSACOES_API_URL);

app.get('/', (req, res) => res.send('API Gateway'));

app.get('/cliente/:id', (req, res, next) => clienteServiceProxy(req, res, next));
app.post('/cliente', (req, res, next) => clienteServiceProxy(req, res, next));

app.get('/saldo/:id', (req, res, next) => transacoesServiceProxy(req, res, next));
app.post('/transacao/:id', (req, res, next) => transacoesServiceProxy(req, res, next));

app.listen(port, () => console.log(`Listening on port ${port}!`));