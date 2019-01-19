const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (res, req, next) => {
  res.send('Hello World!');
});

app.listen(3000);
