'use strict';

const HttpStatus = require('http-status-codes');
const logger = require('chpr-logger');
const users = require('../../models/user');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('./configuration');
const schemaSignUp = require('./schema').ValidatorSchemaOfBody ;
const schemaSignIn = require('./schema').ValidatorForLogin ;
const Joi = require('../../lib/joi');

function _validateSchemaSignUp(body){
    return Joi.attempt(body,schemaSignUp);
}

function _validateSchemaLogin(body){
    return Joi.attempt(body,schemaSignIn);
}

let signToken = user => {
    return JWT.sign({
        iss: 'CodeWorkr',
        sub: user._id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, JWT_SECRET);
};

async function add(req,res){
    logger.info(req.body);
    const user = await users.insertOne(req.body) ;
    if(user){
        return res.status(200).send(user);
    }
    return res.status(400).end();
}

async function facebookOAuth(req,res,next){
    console.log('Got here') ;
    if(req){
        //console.log(req);
        const token = signToken(req.user);
        res.status(200).json({ token });
    }
    res.status(405).end();

}

function secret(req,res,next){
    res.json(req.user);
}

async function signUp(req,res,next){
    req.body = _validateSchemaSignUp(req.body) ;
    if(req.body){
        const user = await users.findOrCreateLocal(req);
        if(!user){
            return res.status(403).json({error:"User already exist!"});
        }
        const token = signToken(user[0]);
        res.status(200).json({ token });
    }
    res.status(500).end();
}

async function signIn(req,res,next){
    //req.body = _validateSchemaLogin(req.body);
    console.log("req :",req);
    if(req){
        const token = signToken(req.user);
        res.status(200).json({ token });
    }
    res.status(405).end();
}


module.exports = {
    add,
    facebookOAuth,
    secret,
    signIn,
    signUp
};