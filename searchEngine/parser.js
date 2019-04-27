'use strict';
const rp = require('request-promise');
const cheerio = require('cheerio');
const tags = require('./tags').tags ;
const {compare} = require('./keywords') ;
const logger = require('chpr-logger');

function parseWebPage(url,callback){
    let pertinance = 0 ;
    rp(url).then((html)=>{
        const $ = cheerio.load(html);
        for(let i=0;i<tags.length;i++){
            pertinance+=compare(cheerio.text($(tags[i])));
        }
        callback(pertinance);
    }).catch(function(err){
        logger.error('An error has occurend in the parser') ;
        callback(pertinance);
    });
    callback(pertinance);
}

module.exports = {
    parseWebPage
};