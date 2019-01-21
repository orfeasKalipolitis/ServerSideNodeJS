const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send you all the dishes!');
    })

    .post((req, res, next) => {
        res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
    })

    .put((req, res, next) => {
        req.statusCode = 403;
        res.end('Put not supported yet');
    })

    .delete((req, res, next) => {
        res.end('Deleting all the dishes!');
    })


    .put((req, res, next) => {
        req.statusCode = 403;
        res.end('Put not supported yet');
    });

module.exports = dishRouter;
