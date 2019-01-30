//  import modules
const express = require('express');
const bodyParser = require('body-parser');

//  import custom modules
var authenticate = require('../authenticate');

//  initialize router
const promoRouter = express.Router();

//  import models
const Promos = require('../models/promotions');

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
        Promos.find({})
        .then(promos => res.json(promos))
        .catch(err => console.log(err));
    })

    //  post implementation
    .post(authenticate.verifyUser,  authenticate.verifyAdmin, (req, res, next) => {
        Promos.create(req.body)
        .then(resp => res.json(resp))
        .catch(err => {
            res.statusCode = 400;
            res.json(err);
            console.log(err);
        });
    })

    //  put implementation
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not permitted on /promotion/');
    })

    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promos.remove({})
        .then(resp => res.json(resp))
        .catch(err => console.log(err));
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
        Promos.findById(req.params.promoId)
        .then(promo => res.json(promo))
        .catch(err => console.log(err));
    })

    //  post implementation
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.end('POST not supported on /promos/' + req.params.promoId);
    })

    //  put implementation
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promos.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, {new: true})
        .then(promo => res.json(promo))
        .catch(err => console.log(err));
    })

    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promos.findByIdAndRemove(req.params.promoId)
        .then(resp => res.json(resp))
        .catch(err => console.log(err));
    });

//  export router
module.exports = promoRouter;