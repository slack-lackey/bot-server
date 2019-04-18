'use strict';

// Load environment variables from `.env` file
require('dotenv').config();

const express = require('express');

const auth = require('./auth/auth-router.js');
const botRouter = require('./bot/bot-router.js');

// Initialize an Express application
const app = express();

// Routers
app.use(auth);
app.use(botRouter);

// Start the express application
// console.log('server.js clients', clients);
module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
  },
};
