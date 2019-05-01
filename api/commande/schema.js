'use strict';

const Joi = require('../../lib/joi');

const ValidatorSchemaOfBody = Joi.object({
    code_commande:Joi.string().required(),
    quantite:Joi.string().required(),
    type_produit:Joi.string().required(),
    user_id:Joi.objectId().required()
});


module.exports = {
    ValidatorSchemaOfBody,
};