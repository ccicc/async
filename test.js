var async = require('async');
var fs = require('fs');
var util = require('util');


async.autoInject({
    func1: function(callback){
        process.nextTick(function(){
            callback(null,'func1');
        });
    },
    func2: function(callback){
        process.nextTick(function(){
            callback(null,'func2');
        });
    },
    func3: function(func1,func2,callback){
        console.log(func1);
        console.log(func2);
        callback(null,'func3');
    }
},function(err,res){
    console.log(res);
});