var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/dragons', db.getAllDragons);

router.get('/api/dragons/:id', db.getSingleDragon);

router.post('/api/dragons', db.createDragon);

router.put('/api/dragons/:id', db.updateDragon);

router.delete('/api/dragons/:id', db.removeDragon);


module.exports = router;