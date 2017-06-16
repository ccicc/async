var async = require('async');
var helper = require('./helper');
var fs = require('fs'); 

var log = helper.log;
var fire = helper.fire;


/**
 * async.series(tasks,callback)
 * 串行执行函数数组中的每个函数，一个函数执行完后再执行下个函数
 * 
 * 中途发生错误后，则后面的函数都不会被执行，并向回调函数传递error和已有的结果
 * 
 * 还可以以json形式来提供tasks
 * 
*/ 

async.series([
    function(callback){
        fs.readFile('test1.txt','utf-8',callback);    
    },
    function(callback){
        fs.readFile('test2.txt','utf-8',callback);
    },
    function(callback){
        fs.readFile('test3.txt','utf-8',callback);
    }
],function(err,res){
    console.log(err);       // null
    console.log(res);       // ['test1','test2','test3']
});


async.series({
    f1: function(callback){
        log('f1');
        fire('func1-400',callback,1000);
    },
    f2: function(callback){
        log('f2');
        fire('func2-300',callback,500);
    },
    f3: function(callback){
        log('f3');
        fire('func3-100',callback,800);
    }
},function(err,res){
    console.log(err);       // null
    console.log(res);       // {f1: 'func1-400', f2: 'func2-300', f3: 'func3-100'}
});
