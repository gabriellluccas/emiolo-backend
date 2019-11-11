class App {
    constructor(express){
        this.express = express();
        console.log('Initializing server...');
        this.middleware();
        this.express.use(require('./routes'));        
        require('./connection');
        this.express.use(express.json());
    }

    middleware(){
        const cors = require('cors');
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:8080'
        ];
        this.express.use(cors({
            origin: allowedOrigins
        }));
    }
    
    get express(){
        return this._express;
    }

    set express(express){
        this._express = express;
    }

}
module.exports = new App(require('express')).express;