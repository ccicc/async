var async = require('async');
var fs = require('fs');

var error = require('./helper').err;
var log = require('./helper').log;
var fire = require('./helper').fire;

/**
 * 
 * async.parallel(tasks,callback)
 * 并行执行多个函数，并将结果传给最后的callback函数
 * callabck的结果数组中的数据按照tasks中声明的顺序排列
 * 
 * 如果出错，则将err和已执行过的函数结果传递给回调函数，未执行完的函数不会传递，
 * 也支持json格式的tasks;
*/ 

async.parallel([
    function(callback){
        fs.readFile('test1.txt','utf-8',callback);
    },
    function(callback){
        fs.readFile('test2.txt','utf-8',callback);
    },
    function(callback){
        fs.readFile('test3.txt','utf-8',callback);
    }
],function(err,results){
    if(err){console.log(err);}
    console.log(results);       // ['test1','test2','test3']
});

/**
 * 中途函数出错，未执行完的函数值将会被忽略，但会在结果数组中占位
*/ 

async.parallel([
    function(callback){
        fire('func-500',callback,500);
    },
    function(callback){
        fire('func-300',callback,300);
    },
    function(callback){
        error('error func-400',callback,400);
    },
    function(callback){
        fire('func-100',callback,100);
    }
],function(err,res){
    console.log(err);       // error func-400
    console.log(res);       // [,'func-300',undefined,'func-100']
});



/**
 * 以json形式传入tasks,最终结果也是json格式的
 * 
*/ 

async.parallel({
    func1: function(callback){
        log('start func1');
        fire('f1-200',callback,200);
    },
    func2: function(callback){
        log('start func2');
        fire('f2-100',callback,100);
    },
    func3: function(callback){
        log('start func3');
        fire('f3-500',callback,500);
    }
},function(err,res){
    console.log(err);
    console.log(res);
});

// 10.1010 >>> start func1
// 10.1010 >>> start func2
// 10.1010 >>> start func3

// {func2: 'f2-100',func1: 'f1-200',func3: 'f3-500'}


/**
 * 中途出错后，未完成的任务，不会传递给最终的结果
 * */ 
async.parallel({
    func1: function(callback){
        fire('f-300',callback,300);
    },
    func2: function(callback){
        fire('f-100',callback,100);
    },
    func3: function(callback){
        error('fc-200',callback,200);
    }
},function(err,res){
    console.log(err);       // fc-200
    console.log(res);       // {func2: 'f-100',func3: undefined}
});


/**
 * async.parallelLimit(tasks,limit,callback)
 * 可设定一次异步操作的最大的并行数量
*/ 