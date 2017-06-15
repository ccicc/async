var async = require('async');
var fs = require('fs');
var util = require('util');
var files = ['test1.txt','test2.txt','test3.txt'];



// 1. applyEach(fns,args,callback)
// 将提供的参数args应用于数组内的每个函数，然后调用回调函数
// 如果只提供函数数组则返回一个新的函数，新函数将接受到的参数传入数组内的函数内
// async.applyEach([fn1,fn2],'args',function(err,res){});

// applyEachSeries()  串行执行


// 2. async.auto(task,concurrency,callback)

// 处理有依赖关系的多个任务的执行
// 第一个参数是对象，它的每个属性就是需要执行的函数逻辑，依赖关系通过函数名指定,
// 第二个参数是并发执行的数量，第三个参数是回调

// results参数只在包含依赖关系时才会传递依赖函数的结果对象

async.auto({
    func1: function(callback){
        callback(null,'func1');
    },
    func2: function(callback){
        callback(null,'func2');
    },
    func3: ['func1','func2',function(results,callback){
        console.log(results.func1);             // fucn1
        console.log(results.func2);             // func2
        console.log(results);                   // {func1: 'func1', func2: 'func2'}
        callback(null,'func3');
    }]
},function(err,res){
    console.log(JSON.stringify(res));           // {func1: 'func1', func2: 'func2', func3: 'func3'}
});
// func3函数依赖于func1,func2,此时func3函数的results参数便是func1,fuc2的结果组成的对象


//如果中途执行错误,则将错误交给最终的callabck函数，执行完的任务也传给callback,未执行完的任务则被忽略

async.auto({
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
    func3: ['func1','func2',function(results,callback){
        process.nextTick(function(){
            callback('func3--error','func3');
        });
    }],
    func4: ['func3',function(){
        process.nextTick(function(){
            callback(null,'func4');
        });
    }]
},function(err,res){
    console.log('Error: %s',err);                   // func3-error
    console.log('res: %s',util.inspect(res));       // {func1: 'func1', func2: 'func2', func3: 'func3'}
});




// 3. async.autoInject()
// async.auto()的依赖注入版本，依赖的任务被直接指定为函数的参数

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
        console.log(func1);                 // func1
        console.log(func2);                 // func2
        callback(null,'func3');
    }
},function(err,res){
    console.log('res: %s',util.inspect(res));             // res: {func1: 'func1', func2: 'func2', func3: 'func3'}
});