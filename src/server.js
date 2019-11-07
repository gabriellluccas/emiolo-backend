const app = require('./app');
const connection = require('./connection');

const port = process.env.HOST_PORT || 3000
app.listen(port, () => console.log(`Servidor escutando ${port}!`))