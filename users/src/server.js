const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const porta = 3001;

const router = require("./router/router");

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(
    express.urlencoded({
        extended: true,
        limit: '100mb',
        parameterLimit: '100000',
    }),
);
app.use(router);
server.listen(porta, () => console.log(`Listening on port ${porta}!`));
