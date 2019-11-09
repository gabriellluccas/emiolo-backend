/* Initializing routes and server  */
const app = require('./app');

/* Listening requests */
const port = process.env.APP_PORT || 3000
app.listen(port, () => {
    console.log(`Server linstening on the ${port}!`)
});

