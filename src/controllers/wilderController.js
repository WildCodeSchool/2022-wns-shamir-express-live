const { dataSource } = require("../tools/utils");
const Wilder = require("../models/Wilder");
const express = require("express");

const router = express.Router();

router.get('/', (request, response) => {
    response.send('TOTO');
});

router.get('/:id', (request, response) => {

});

router.post('/', async (request, response) => {
    try {
        const wilderRequest = request.body;
        const wilderCreated = service.create(wilderRequest);
        response.send(wilderCreated);
    } catch(e) {
        response.send('ERROR');
    }
});

module.exports = router;