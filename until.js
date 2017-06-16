var async = require('async');
var log = require('./helper').log;


/**
 * async.until(test,fn,callback)
 * 
 * 与async.whilst()相反,当test为假时循环，为真时跳出循环
 * 
*/ 

var current = false;
var count = 0;

async.until(
    function(){
        return current;
    },
    function(callback){
        count ++;
        log(count);
        if(count === 3){
            current = true;
        }
        setTimeout(function(){
            callback(null,current);
        },1000);
    },
    function(err,res){
        console.log('result: ' + res);
    }
);


/**
 * 
 * async.doUntil(fn,test,callback)
 * 
 * 与async.doWhilst()，为假时循环，为真时跳出循环
 * 
*/ 

var count2 = 0;

async.doUntil(
    function(callback){
        count2++;
        log(count2);
        setTimeout(function(){
            callback(null,count2) ;
        },1000);
    },
    function(){
        return count2 > 3;
    },
    function(err,result){
        console.log('result: ' + result);
    }
);


/**
 * async.forever(fn,callback)
 * 
 * 无限次循环，只有当打算错误时，才调用回调函数
 * */ 

var count = 0;

async.forever(
    function(callback){
        count++;
        log(count);
        setTimeout(function(){
            callback();
        },1000);
    },
    function(err){
        console.log(err);
    }
);