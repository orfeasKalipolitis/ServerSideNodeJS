//  import modules
const express = require('express');
const bodyParser = require('body-parser');

//  import custom modules
var authenticate = require('../authenticate');
const cors = require('./cors');

//  initialize router
const leaderRouter = express.Router();

//  import models
const Leaders = require('../models/leaders');

//  use body parser module
leaderRouter.use(bodyParser.json());

//  configure routes
//  basic route
leaderRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    //  for all requests
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })

    //  get implementation
    .get(cors.cors, (req, res, next) => {
        Leaders.find({})
        .then(leaders => res.json(leaders))
        .catch(err => console.log(err));
    })

    //  post implementation
    .post(cors.corsWithOptions, authenticate.verifyUser,  authenticate.verifyAdmin, (req, res, next) => {
        Leaders.create(req.body)
        .then(resp => res.json(resp))
        .catch(err => {
            res.statusCode = 400;
            res.json(err);
            console.log(err);
        });
    })

    //  put implementation
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not permitted on /leaders/');
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leaders.remove({})
        .then(resp => res.json(resp))
        .catch(err => console.log(err));
    });

//  route with parameter leaderId
leaderRouter.route('/:leaderId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    //  for all requests
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })

    //  get implementation
    .get(cors.cors, (req, res, next) => {
        Leaders.findById(req.params.leaderId)
        .then(leader => res.json(leader))
        .catch(err => console.log(err));
    })

    //  post implementation
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.end('POST not supported on /leaders/' + req.params.leaderId);
    })

    //  put implementation
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, {new: true})
        .then(leader => res.json(leader))
        .catch(err => console.log(err));
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaderId)
        .then(resp => res.json(resp))
        .catch(err => console.log(err));
    });

//  export router
module.exports = leaderRouter;