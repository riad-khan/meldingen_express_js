const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
let mySqlConnection = require('./connection')

app.listen(3000)