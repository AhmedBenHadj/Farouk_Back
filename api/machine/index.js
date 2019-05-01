const express = require('express');
const router=  express.Router();
const controller = require('./controller');
const wrap = require('co-express');


router.post('/addMachine',wrap(controller.addMachine));
router.get('/findMachine',wrap(controller.findMachine));
router.delete('/deleteMachine',wrap(controller.deleteMachine));

module.exports = router ;