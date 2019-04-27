'use strict';

const keywords = ['free','w3schools','openclassroom','udemy','learning','quick','fast','good','web','best','youtube','learn'];

function compare(externalString){
    let pertianance = 0 ;
    const rekeywords = transformKeywordsToRegex() ;
    for(let i=0;i<keywords.length;i++){
        if(externalString.match(rekeywords[i]))
            pertianance+=1 ;
    }
    return pertianance ;
}

function transformToRegex(string){
    string = "("+string+")+";
    const re = new RegExp(string,"gmi");
    return re ;
}

function transformKeywordsToRegex(){
    let res = [] ;
    for(let i=0;i<keywords.length;i++){
        res.push(transformToRegex(keywords[i])) ;
    }
    return res ;
}

function getRegexKeywords(){
    return transformKeywordsToRegex() ;
}

module.exports = {
    compare,
    keywords,
    getRegexKeywords
};