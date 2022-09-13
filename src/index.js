const express = require('express');
const typeorm = require('typeorm');
const Wilder = require('./Wilder');

const dataSource = new typeorm.DataSource({
  type: 'sqlite',
  database: './wildersdb.sqlite',
  synchronize: true,
  entities: [
    require('./Wilder'),
  ]
});

const app = express();

app.use(express.json());

app.get('/wilders', (request, response) => {
});

app.get('/wilders/:id', (request, response) => {
  response.send("First endpoint");
});

app.post('/wilders', (request, response) => {
  response.send("First endpoint");
});

app.listen(3000, async () => {
  await dataSource.initialize();
  dataSource.getRepository(Wilder).save({
    name: 'Maël'
  });
  console.log('Server launch on http://localhost:3000');
});