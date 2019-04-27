const express = require('express');
const wrap = require('co-express');
const passport = require('passport') ;
const controller = require('./controller');
const passportFBConf = require('../../passport/facebook-passport');
const passportJWTConf = require('../../passport/jwt-passport');
const passportLOCALConf = require('../../passport/local-passport');
const router=  express.Router();
const passportJWT = passport.authenticate('jwt', { session: false });
const passportSignIn = passport.authenticate('local', { session: false });

router.post('/signup',wrap(controller.signUp));
router.post('/signin',passportSignIn, controller.signIn);
router.post('/add',wrap(controller.add));
router.post('/oauth/facebook',passport.authenticate('facebookToken',{session:false}),controller.facebookOAuth) ;
router.get('/secret',passportJWT,controller.secret);
module.exports = router ;