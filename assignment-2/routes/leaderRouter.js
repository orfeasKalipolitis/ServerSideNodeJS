//  import modules
const express = require('express');
const bodyParser = require('body-parser');

//  import model
const Leaders = require('../models/leaders');

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
        res.setHeader('Content-Type', 'application/json');
        next();
    })

    //  get implementation
    .get((req, res, next) => {
        Leaders.find({})
        .then(leaders => res.json(leaders))
        .catch(err => console.log(err));
    })

    //  post implementation
    .post((req, res, next) => {
        Leaders.create(req.body)
        .then(resp => res.json(resp))
        .catch(err => console.log(err));
    })

    //  put implementation
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not permitted on /leaders/');
    })

    .delete((req, res, next) => {
        Leaders.remove({})
        .then(resp => res.json(resp))
        .catch(err => console.log(err));
    });

//  route with parameter leaderId
leaderRouter.route('/:leaderId')
    //  for all requests
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })

    //  get implementation
    .get((req, res, next) => {
        Leaders.findById(req.params.leaderId)
        .then(leader => res.json(leader))
        .catch(err => console.log(err));
    })

    //  post implementation
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST not supported on /leaders/' + req.params.leaderId);
    })

    //  put implementation
    .put((req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, {new: true})
        .then(leader => res.json(leader))
        .catch(err => console.log(err));
    })

    .delete((req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaderId)
        .then(resp => res.json(resp))
        .catch(err => console.log(err));
    });

//  export router
module.exports = leaderRouter;