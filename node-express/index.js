const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/dishes', (req, res, next) => {
    res.end('Will send you all the dishes!');
});

app.post('/dishes', (req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.put('/dishes', (req, res, next) => {
    req.statusCode = 403;
    res.end('Put not supported yet');
});

app.delete('/dishes', (req, res, next) => {
    res.end('Deleting all the dishes!');
});

app.get('/dishes/:dishId', (req, res, next) => {
    res.end('Will send details of dish: ' + req.params.dishId);
});

app.post('/dishes/:dishId', (req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.put('/dishes/:dishId', (req, res, next) => {
    req.statusCode = 403;
    res.end('Put not supported yet');
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish:' + req.params.dishId + '!');
});

app.use(express.static(__dirname + '/public'));

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server listening on: ${hostname}:${port}`);
});