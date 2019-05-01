'use strict';
const mongoose = require('mongoose');
const Joi = require('../lib/joi');
const dateLib = require('../lib/date');
const { ObjectId } = require('mongoose').Types;

const commandeSchema =  mongoose.Schema({
    code_commande:String,
    date:Date,
    quantite:String,
    type_produit:String,
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

const joiCommandeSchema = Joi.object({
    _id: Joi.objectId(),
    code_commande:Joi.string().required(),
    quantite:Joi.string().required(),
    type_produit:Joi.string().required(),
    date: Joi.date().default(() => dateLib.getDate(), 'time of creation'),
    user_id:Joi.objectId().required()


});

function _validateSchema(commande1) {
    return Joi.attempt(commande1, joiCommandeSchema);
}

function collection(){
    return mongoose.model('Commande', commandeSchema) ;
}

async function insertOne(commande){
    const commande_validate = _validateSchema(commande);
    if(commande_validate){
        const commande_returned = await collection().insertMany(commande_validate);
        return commande_returned ;
    }
    return null;
}

async function deleteById(code_commande){

    const commande_delete = await collection().find({code_commande:code_commande});
    if(commande_delete) {
        await collection().deleteOne({id: commande_delete._id});
        return true;
    }
    return false;

}


async function find(query = {}, projections = {}) {
    return await collection().find(query, projections);
}

async function findOneById(commandeId, projections = {}) {
    return await collection().findOne({ _id: commandeId }, projections);
}

async function findByCodeCommande(code_commande){
    return await  collection().find({code_commande:code_commande});


}


async function isValidPassword(user,password){
    const _returnedvalue = await collection().findOne({_id:user._id},{password:1,_id:0});
    return _returnedvalue.password === password ;
}

async function updateOne(code_commande, updatedFields) {
    const result = await collection().updateOne(
        { code_commande: code_commande },
        { $set: updatedFields },
    );
    return result;
}

async function IncOne(userId, updatedFields) {
    const result = await collection().updateOne(
        { _id: userId },
        { $inc: updatedFields },
    );
    return result;
}
async function findOrCreateLocal(req){
    const {firstname,lastname,login,password} = req.body ;
    const foundUser = await collection().findOne({login:login});
    if(foundUser){
        return null ;
    }
    const newUser = await insertOne({
        firstname:firstname,
        lastname:lastname ,
        login:login,
        password:password
    });
    return newUser ;
}

async function findOneByLogin(userEmail){
    const user = await collection().findOne({login:userEmail});
    return user ;
}

module.exports = {
    insertOne,
    deleteById,
    find,
    findByCodeCommande,
    findOneById,
    updateOne,
    isValidPassword,
    findOrCreateLocal,
    findOneByLogin
};