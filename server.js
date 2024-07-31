const http = require('http');

// Express app
const app = require('./app');

const port = process.env.PORT || 3000;

// TODO: add listener
const server = http.createServer(app);

// listen
server.listen(port);