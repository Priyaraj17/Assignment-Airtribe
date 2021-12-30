const express = require('express');
const app = express();
require('./db');
const port = process.env.PORT || 3000;

// server is started.
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});