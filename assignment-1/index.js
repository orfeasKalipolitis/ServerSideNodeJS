//  import modules
const express = require('express');
const http = require('http');
const morgan = require('morgan');

//  import routers
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

//  set constants
const hostname = 'localhost';
const port = 3000;

//  instantiate express app
const app = express();

//  use modules
app.use(morgan('dev'));

//  use routers
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);


//  create server
const server = http.createServer(app);

//  listen for connections
server.listen(port, hostname, () => {
    console.log(`Server listening on: ${hostname}:${port}`);
});