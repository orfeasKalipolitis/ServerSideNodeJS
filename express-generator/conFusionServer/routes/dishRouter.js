//  import modules
const express = require('express');
const bodyParser = require('body-parser');

const Dish = require('../models/dishes');

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
        res.setHeader('Content-Type', 'application/json');
        next();
    })

    //  get implementation
    .get((req, res, next) => {
        Dish.find({})
        .then(dishes => res.json(dishes))
        .catch(err => console.log(err));
    })

    //  post implementation
    .post((req, res, next) => {
        Dish.create(req.body)
        .then(resp => res.json(resp))
        .catch(err => console.log(err));
    })

    //  put implementation
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not permitted on /dishes/');
    })

    .delete((req, res, next) => {
        Dish.remove({})
        .then(resp => res.json(resp))
        .catch(err => console.log(err));
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
        Dish.findById(req.params.dishId)
        .then(dish => res.json(dish))
        .catch(err => console.log(err));
    })

    //  post implementation
    .post((req, res, next) => {
        res.end('POST not supported on /dishes/' + req.params.dishId);
    })

    //  put implementation
    .put((req, res, next) => {
        Dish.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, {new: true})
        .then(dish => res.json(dish))
        .catch(err => console.log(err));
    })

    .delete((req, res, next) => {
        Dish.findByIdAndRemove(req.params.dishId)
        .then(resp => res.json(resp))
        .catch(err => console.log(err));
    });

//  export router
module.exports = dishRouter;
