const express = require('express'); 
const routes = require('./routes');

class App {
    constructor(express, routes){
        this._express = express();
        this._routes = routes;
        this.routes(this.express);        
    }

    // middlewares(){
    //     this.express.use(express.json());
    // }

    get express(){
        return this._express;
    }

    get routes(){
        return this._routes;
    }
}
module.exports = new App(express, routes).express;