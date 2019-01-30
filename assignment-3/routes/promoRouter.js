//  import modules
const express = require('express');
const bodyParser = require('body-parser');

//  initialize router
const promoRouter = express.Router();

//  use body parser module
promoRouter.use(bodyParser.json());

//  configure routes
//  basic route
promoRouter.route('/')
    //  for all requests
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })

    //  get implementation
    .get((req, res, next) => {
        res.end('Will send details about all the promotions!');
    })
    
    //  post implementation
    .post((req, res, next) => {
        res.end('Will create promotion with name: ' + req.body.name +
        ' and description: ' + req.body.description);
    })
    
    //  put implementation
    .put((req, res, next) => {
        res.end('Will update promotions with new name: ' + req.body.name +
        ' and description: ' + req.body.description);
    })
    
    //  delete implementation
    .delete((req, res, next) => {
        res.end('Will delete all promotions!');
    });

//  route with parameter promoId
promoRouter.route('/:promoId')
    //  for all requests
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })

    //  get implementation
    .get((req, res, next) => {
        res.end('Will send details about promotion: ' + req.params.promoId);
    })
    
    //  post implementation
    .post((req, res, next) => {
        res.end('Will create promotion: ' + req.params.promoId + 
        ' with name: ' + req.body.name + ' and description: ' + req.body.description);
    })
    
    //  put implementation
    .put((req, res, next) => {
        res.end('Will update promotion: ' + req.params.promoId +  
        ' with new name: ' + req.body.name + ' and description: ' + req.body.description);
    })
    
    //  delete implementation
    .delete((req, res, next) => {
        res.end('Will delete promotion ' + req.params.promoId + '!');
    });

//  export router
module.exports = promoRouter;