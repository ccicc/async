var async = require('async');
var log = require('./helper').log;
var fs = require('fs');


/**
 * async.compose(...functions)
 * async.compose(fn3,fn2,fn1)   <==>    fn3(fn2(fn1()))
 * 
 * 创建一个传递一组异步函数集合的函数，上个异步函数的结果作为下个异步函数的输入
 * 通过compose将异步函数组合成 f(g(h()))的形式
*/ 


var fn1 = function(val,callback){
    setTimeout(function(){
        callback(null,val.toString() + '--fn1');
    },500);
};

var fn2 = function(val,callback){
    setTimeout(function(){
        callback(null,val + '--fn2');
    });
};

var compose = async.compose(fn2,fn1,fs.readFile);

compose('test1.txt',function(err,res){
    console.log(res);               // test1--fn1--fn2
});



/**
 * async.seq(...functions)
 * 
 * 相当于是async.compose()的反向版本
 * 
*/ 

var seq = async.seq(fs.readFile,fn1,fn2);

seq('./test3.txt',function(err,res){
    console.log(res);               // test3-fn1-fn2
});


// async.timesLimit(n,limit,fn,callback)    // 可以指定异步操作的数量

// async.timesSeries(n,fn,callback)        // 串行执行