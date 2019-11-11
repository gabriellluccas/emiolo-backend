const routes = require('express').Router();

const GoogleController = require('./app/controllers/google-controller');
const DashboardController = require('./app/controllers/dashboard-controller');
const SwapiController = require('./app/controllers/swapi-controller');
// const authMiddleware = require();


routes.get('/auth/google', GoogleController.redirectGoogleApi);
routes.get('/auth/google/callback', GoogleController.getDataFromGoogleApi);
routes.get('/', DashboardController.listUsers);
routes.get('/swapi/species/', SwapiController.listSpecies);

    // routes.use(authMiddleware);
    
module.exports = routes;
