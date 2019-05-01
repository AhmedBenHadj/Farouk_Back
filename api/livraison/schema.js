'use strict';

const Joi = require('../../lib/joi');

const ValidatorSchemaOfBody = Joi.object({
    code_livraison:Joi.string().required(),
    quantite:Joi.string().required(),
    type_produit:Joi.string().required(),
    commande_id:Joi.objectId().required(),
    clinet:Joi.string().required()
});


module.exports = {
    ValidatorSchemaOfBody,
};