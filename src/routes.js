const routes = require('express').Router();

const GoogleController = require('./app/controllers/google-controller')
// const authMiddleware = require();


routes.get('/auth/google', GoogleController.redirectGoogleApi);
routes.get('/auth/google/callback', GoogleController.getDataFromGoogleApi);

    // routes.use(authMiddleware);
    
module.exports = routes;
