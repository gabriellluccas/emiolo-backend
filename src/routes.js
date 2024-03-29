const routes = require('express').Router();

const LoginController = require('./app/controllers/login-controller');
const GoogleController = require('./app/controllers/google-controller');
const DashboardController = require('./app/controllers/dashboard-controller');
const SwapiController = require('./app/controllers/swapi-controller');
const authMiddleware = require('./app/middleware/auth-middleware');


routes.post('/auth', LoginController.index);
routes.post('/auth/save', LoginController.store);
routes.get('/auth/google', GoogleController.redirectGoogleApi);
routes.get('/auth/google/callback', GoogleController.getDataFromGoogleApi);

routes.use(authMiddleware);

routes.get('/users', DashboardController.listUsers);
routes.get('/swapi/species/', SwapiController.listSpecies);
routes.get('/swapi/planets/', SwapiController.listPlanets);
routes.get('/swapi/specie/:id', SwapiController.getSpecie);
routes.get('/swapi/planet/:id', SwapiController.getPlanet);
routes.get('/swapi/film/:id', SwapiController.getFilm);
routes.get('/swapi/vehicle/:id', SwapiController.getVehicle);
routes.get('/swapi/starship/:id', SwapiController.getStarship);
routes.get('/swapi/person/:id', SwapiController.getPerson);

    
module.exports = routes;
