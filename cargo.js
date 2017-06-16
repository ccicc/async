var async = require('async');
var fs = require('fs');
var helper = require('./helper');
var log = helper.log;
var wait = helper.wait;


/**
 * cargo是一个串行执行的消息队列，限制了worker数量，不再一次性全部执行
 * 当worker数量不够时，新加入的任务将会排队等候，直到worker空闲出来
 * 
 * cargo每次会加载满额的任务单元，只有任务单元中全部执行完后，才会加载新的任务单元
 * 
*/

// cargo(worker,payload)
// worker是用于处理任务数组的异步函数
// payload用于确定每轮可执行的任务数,默认是无限


var cargo = async.cargo(function(tasks,callback){
    for(var i = 0,l = tasks.length;i < l;i++){
        log('start ' + tasks[i].name);
    }
    callback();
},2);

// saturated监听worker将要饱和
cargo.saturated = function(){
    log('worker将要饱和');
};

// empty 任务单元中最后一个任务提交给worker后触发
cargo.empty = function(){
    log('任务单元中没有任务等待');
};

// 所有任务完成后调用
cargo.drain = function(){
    log('所有任务已完成');
};

cargo.push({'name': 'A'},function(err){
    wait(1000);
    log('finished A');
});

cargo.push({'name':'B'},function(err){
    wait(200);
    log('finished B');
});

cargo.push({'name':'C'},function(err){
    wait(300);
    log('finished C');
});