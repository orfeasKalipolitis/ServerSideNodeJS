//  import modules
const express = require('express');
const bodyParser = require('body-parser');

//  initialize router
const dishRouter = express.Router();

//  use body parser module
dishRouter.use(bodyParser.json());

//  configure routing
//  basic route
dishRouter.route('/')
    //  for all requests
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })

    //  get implementation
    .get((req, res, next) => {
        res.end('Will send you details about all the dishes!');
    })

    //  post implementation
    .post((req, res, next) => {
        res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
    })

    //  put implementation
    .put((req, res, next) => {
        res.end('Updating the dish with new name: ' + req.body.name + 
        ' and new details: ' + req.body.description);
    })

    .delete((req, res, next) => {
        res.end('Deleting all the dishes!');
    });

//  route with parameter dishId
dishRouter.route('/:dishId')
    //  for all requests
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })

    //  get implementation
    .get((req, res, next) => {
        res.end('Will send details of dish: ' + req.params.dishId);
    })

    //  post implementation
    .post((req, res, next) => {
        res.end('Will add dish: ' +req.params.dishId + ' with name: ' + req.body.name + 
        ' and details: ' + req.body.description);
    })

    //  put implementation
    .put((req, res, next) => {
        res.end('Updating the dish: ' + req.params.dishId + ' with new name: ' + req.body.name + 
        ' and new details: ' + req.body.description);
    })

    .delete((req, res, next) => {
        res.end('Deleting dish: ' + req.params.dishId + '!');
    });

//  export router
module.exports = dishRouter;
