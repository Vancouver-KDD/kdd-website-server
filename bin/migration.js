const query = require('../lib/database').query;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

query("CREATE TABLE users \
( username VARCHAR(255) )");