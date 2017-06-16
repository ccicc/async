var async = require('async');
var fs = require('fs');

/**
 * async.times(n,fn,callback)
 * 指定运行异步函数n次，并将结果合并到数组中
 * 
*/

async.times(3,function(n,callback){
    fs.readFile('test1.txt','utf-8',callback);
    console.log(n);
},function(err,res){
    console.log(res);
});

// 0
// 1
// 2
// ['test1','test1','test1']


/**
 * async.tryEach(tasks,callback)
 * 
 * 只要tasks中有一个任务成功，则将成功结果传递给回调函数,后续任务就不再执行
 * 
*/

async.tryEach([
    function(callback){
        fs.readFile('test.txt','utf-8',callback);
    },
    function(callback){
        fs.readFile('test3.txt','utf-8',callback);
    },
    function(callback){
        fs.readFile('test2.txt','utf-8',callback);
    }
],function(err,res){
    console.log(res);       // test3
});