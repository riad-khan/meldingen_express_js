const express = require('express');
const app = express();
require(`./tools`)
require('./middlewares')(app);
require('./routes')(app);
<<<<<<< HEAD
require('./scraper')
=======
 require('./scraper')
>>>>>>> c2833cfc7dc6b9845e0ad52883d7af2b7a607b02
module.exports = app ;