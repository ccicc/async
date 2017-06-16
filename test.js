var async = require('async');
var fs = require('fs');
var util = require('util');
var log = require('./helper').log;
var fire = require('./helper').fire;



async.tryEach([
    function(callback){
        fs.readFile('test,txt','utf-8',callback);
    },
    function(callback){
        fs.readFile('test3.txt','utf-8',callback);
    },
    function(callback){
        fs.readFile('test1.txt','utf-8',callback);
    }
],function(err,res){
    console.log(res);
});