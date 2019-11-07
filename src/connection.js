const mongoose = require('mongoose');

const connection = () => {
    
    /* Database config */
    // const username = process.env.DB_USER || null;
    // const password = process.env.DB_PASS || null;
    const hostname = process.env.DB_HOST || 'localhost';
    const database = process.env.DB_BASE || 'emiolo';
    const port = process.env.DB_PORT || '27017';

    try{
        mongoose.connect(`mongodb://${hostname}:${port}/${database}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });  
        console.log('Connect with mongodb is a sucess');
    } catch(err){
        console.error(err);
    }
}

module.export = connection();