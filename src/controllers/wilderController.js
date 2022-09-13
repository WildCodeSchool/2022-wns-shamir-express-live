const express = require("express");
const service = require('../services/wilderService')

const router = express.Router();

// GET /wilders
router.get('/', async (request, response) => {
    const wilders = await service.getAll();
    response.send(wilders);
});

// POST /wilders
// BODY {}
router.post('/', async (request, response) => {
    try {
        const wilderRequest = request.body;
        const wilderCreated = await service.create(wilderRequest);
        response.send(wilderCreated);
    } catch(e) {
        response.send('ERROR');
    }
});

// PUT /wilders/4
// BODY {}
router.put('/:id', async (request, response) => {
    const wilderId = request.params.id;
    const wilderRequest = request.body;
    const wilderUpdated = await service.update(wilderRequest, wilderId);
    response.send(wilderUpdated);
});

// DELETE /wilders/6
router.delete('/:id', async (request, response) => {
    const wilderId = request.params.id;
    await service.delete(wilderId);
    response.sendStatus(204);
});

module.exports = router;