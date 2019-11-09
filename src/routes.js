const GoogleController = require('./app/controllers/google-controller')

const Routes = (routes) => {

    routes.get('/auth/google', GoogleController.redirectGoogleApi);
    routes.get('/auth/google/callback', GoogleController.getDataFromGoogleApi);

};
module.exports = Routes;
