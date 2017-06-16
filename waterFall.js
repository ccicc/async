var async = require('async');


/**
 * 按顺序执行一组函数，每个函数的值作为参数传递给下个函数
 * 
 * 如果中途出错，后续函数将不会被执行，错误将传递给回调函数,之前的结果被抛弃
 * 该函数不支持json的tasks
*/

async.waterfall([
    function(callback){
        setTimeout(function(){
            callback(null,10);
        },1000);
    },
    function(n,callback){
        setTimeout(function(){
            callback(null,n + 20);
        });
    },
    function(n,callback){
        setTimeout(function(){
            callback(null,n + 30);
        });
    }
],function(err,res){
    console.log(res);       // 60
});