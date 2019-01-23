//  import modules
const express = require('express');
const bodyParser = require('body-parser');

//  initialize router
const leaderRouter = express.Router();

//  use body parser module
leaderRouter.use(bodyParser.json());

//  configure routes
//  basic route
leaderRouter.route('/')
    //  for all requests
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })

    //  get implementation
    .get((req, res, next) => {
        res.end('Will send all of leaders details!');
    })
    
    //  post implementation
    .post((req, res, next) => {
        res.end('Will create leader with name: ' + req.body.name +
        ' and description: ' + req.body.description);
    })
    
    //  put implementation
    .put((req, res, next) => {
        res.end('Will update leader with new name: ' + req.body.name +
        ' and description: ' + req.body.description);
    })
    
    //  delete implementation
    .delete((req, res, next) => {
        res.end('Will delete all the leaders!');
    });

//  route with parameter promoId
leaderRouter.route('/:leaderId')
    //  for all requests
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })

    //  get implementation
    .get((req, res, next) => {
        res.end('Will send details about leader: ' + req.params.leaderId);
    })
    
    //  post implementation
    .post((req, res, next) => {
        res.end('Will create leader: ' + req.params.leaderId + 
        ' with name: ' + req.body.name + ' and description: ' + req.body.description);
    })
    
    //  put implementation
    .put((req, res, next) => {
        res.end('Will update leader: ' + req.params.leaderId +  
        ' with new name: ' + req.body.name + ' and description: ' + req.body.description);
    })
    
    //  delete implementation
    .delete((req, res, next) => {
        res.end('Will delete leader ' + req.params.leaderId + '!');
    });

//  export router
module.exports = leaderRouter;