'use strict';

const Joi = require('../../lib/joi');

const ValidatorSchemaOfBody = Joi.object({
    nom :Joi.string().required(),
    prenom :Joi.string().required(),
    cin:Joi.string().min(8).required(),
    mail:Joi.string().email({minDomainAtoms: 2}).required(),
    password:Joi.string().min(8).required()
});

const ValidatorForLogin = Joi.object({
    login:Joi.string().required(),
    password:Joi.string().required()
});

module.exports = {
    ValidatorSchemaOfBody,
    ValidatorForLogin
};