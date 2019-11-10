class App {
    constructor(express){
        this.express = express();
        console.log('Initializing server...');
        this.express.use(require('./routes'));        
        require('./connection');
        this.express.use(express.json());
    }

    get express(){
        return this._express;
    }

    set express(express){
        this._express = express;
    }

}
module.exports = new App(require('express')).express;