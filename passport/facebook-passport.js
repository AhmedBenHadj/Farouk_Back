'use strict';

const passport = require('passport');
const Strategy = require('passport-facebook-token');
const logger = require('chpr-logger');
const config = require('../config');
const user = require('../models/user');

passport.use('facebookToken' , new Strategy({
        clientID: config.FACEBOOK_CLIENT_ID,
        clientSecret: config.FACEBOOK_CLIENT_SECRET,
    },async (accessToken,refreshToken,profile,done) => {
        try{
            // console.log('profile :',profile);
            // console.log('refreshToken :',refreshToken);
            // console.log('accessToken :',accessToken);
            //logger.info(await user.findOrCreateByFacebookId(profile));
            let _user = await user.findOrCreateByFacebookId(profile) ;
            done(null,_user);
        }
        catch(error){
            done(error,false , error.message) ;
        }
    }
)) ;
