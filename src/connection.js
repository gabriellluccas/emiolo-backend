const mongoose = require('mongoose');

const connection = () => {
    mongoose.set('useCreateIndex', true);
    
    /* Database config */
    // const username = process.env.DB_USER || null;
    // const password = process.env.DB_PASS || null;
    const hostname = process.env.DB_HOST || 'localhost';
    const database = process.env.DB_BASE || 'emiolo';
    const port = process.env.DB_PORT || '27017';

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    try{
        mongoose.connect(`mongodb://${hostname}:${port}/${database}`, options);  
        console.log('Successfully connected with MongoDB!');
    } catch(err){
        console.error(err);
    }
}
module.export = connection();