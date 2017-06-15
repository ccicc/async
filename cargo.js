var async = require('async');
var fs = require('fs');
var helper = require('./helper');
var log = helper.log;


/**
 * cargo是一个串行执行的消息队列，与queue一致，但是限制了worker数量，不再一次性全部执行
 * 当worker数量不够时，新加入的任务将会排队等候，直到worker空闲出来
 * 
 * cargo每次会加载满额的任务单元，只有任务单元中全部执行完后，才会加载新的任务单元
 * 
 * **/

// cargo(worker,payload)
// worker是用于处理任务数组的异步函数
// payload用于确定每轮可执行的任务数,默认是无限



var cargo = async.cargo(function(tasks,callback){
    for(var i = 0,l = tasks.length;i < l;i++){
        fs.readFile(tasks[i],function(err,res){
            callback(err,res);
        });
    }
},2);

cargo.push('test1.txt',function(err,res){
    log(res.toString());
});

cargo.push('test2.txt',function(err,res){
    log(res.toString());
});
