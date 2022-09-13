const express = require('express');
const { dataSource } = require('./tools/utils');
const wilderController = require('./controllers/wilderController');
const skillsController = require('./controllers/skillsController');

const app = express();

app.use(express.json());

app.use('/wilders', wilderController);
app.use('/skills', skillsController);

app.listen(3000, async () => {
  await dataSource.initialize();
  console.log('Server launch on http://localhost:3000');
});
