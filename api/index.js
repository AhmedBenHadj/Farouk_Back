'use strict';
const { Router } = require('express');

const userRoute = require('./user');

module.exports = (app)=> {
    const router = Router();
    router.use('/user', userRoute);
    app.use('/api', router);
};
