//  import modules
const express = require('express');
const bodyParser = require('body-parser');

//  import model
const Promotions = require('../models/promotions');

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
        res.setHeader('Content-Type', 'application/json');
        next();
    })

    //  get implementation
    .get((req, res, next) => {
        Promotions.find({})
        .then(promotions => res.json(promotions))
        .catch(err => console.log(err));
    })

    //  post implementation
    .post((req, res, next) => {
        Promotions.create(req.body)
        .then(resp => res.json(resp))
        .catch(err => console.log(err));
    })

    //  put implementation
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not permitted on /promotions/');
    })

    .delete((req, res, next) => {
        Promotions.remove({})
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
        Promotions.findById(req.params.promoId)
        .then(promotion => res.json(promotion))
        .catch(err => console.log(err));
    })

    //  post implementation
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST not supported on /promotions/' + req.params.promoId);
    })

    //  put implementation
    .put((req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, {new: true})
        .then(promotion => res.json(promotion))
        .catch(err => console.log(err));
    })

    .delete((req, res, next) => {
        Promotions.findByIdAndRemove(req.params.promoId)
        .then(resp => res.json(resp))
        .catch(err => console.log(err));
    });

//  export router
module.exports = promoRouter;