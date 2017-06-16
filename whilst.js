var async = require('async'),
    log = require('./helper').log;


/**
 * async.whilst(test,fn,callback)
 * 
 * 相当于while语法，当第一个函数为真时，循环调用异步函数fn,完成后或出错时调用回调函数
 * 
 */ 

var count = 0;

async.whilst(
    function(){
        return count < 3;
    },
    function(callback){
        count++;
        log(count);
        setTimeout(function(){
            callback(null,count);
        },1000);
    },
    function(err,res){
        if(err){
            log('Error',err);
        }
        log('res: ' + res);
    }
);

// 1
// 2
// 3
// res: 3


/**
 * 
 * async.doWhilst(fn,test,callback) 
 * 先执行一次循环，再做判断
 * 
 */

var num = 0;

async.doWhilst(
    function(callback){
        num++;
        log(num);
        setTimeout(function(){
            callback(null,num);
        },1000);
    },
    function(){
        return num < 3;
    },
    function(err,res){
        if(err){
            log('Error:',err);
        }
        console.log('result: ' + res);
    }
);

// 1
// 2
// 3
// result: 3


/**
 * async.during(test,fn,callback)
 * async.doDuring(fn,test,callback)
 * 
 * 判断循环的函数是异步的，其他与async.whilst()相同
*/ 

async.during(
    function(callback){
        callback(null,count < 3);
    },function(callback){
        count++;
        setTimeout(function(){
            callback(null,count);
        },1000);
    },function(err){
        
    }
);