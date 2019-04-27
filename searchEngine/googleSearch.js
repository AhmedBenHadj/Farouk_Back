'use strict';

const scraper  = require('google-search-scraper');
const keywords = require('../searchEngine/keywords');
const parser = require('../searchEngine/parser');
const clicks = require('../models/clickeds');

async function search(searchRequest,callback){
    const options = {
        query:searchRequest,
        limit: 10
    };

    await scraper.search(options,(err,url,meta)=>{
        if(err) throw err ;
        let i = 0 ;
        if(url !== undefined || url !== null || url !== ''){
            parser.parseWebPage(url,async (response)=>{
                i+=1 ;
                if(i === 2){
                    let _pertinance = keywords.compare(meta.desc) + response ;
                    const clicked = await clicks.find({url:url});
                    if(clicked.length>0){
                        _pertinance=_pertinance+clicked[0].clicked ;
                    }
                    let _url = {
                        url : url ,
                        title : meta.title ,
                        meta : meta.meta,
                        desc : meta.desc,
                        pertinance : _pertinance,
                    };
                    callback(_url);
                }
            });
        }
    });
}


module.exports = {
    search
};

