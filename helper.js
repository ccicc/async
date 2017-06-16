var moment = require('moment');

exports.fire = function(obj,callback,timeout){
    // 将obj的内容返回给async
    timeout = timeout || 200;
    setTimeout(function(){
        callback(null,obj);
    },timeout);
};

exports.err = function(errMsg,callback,timeout){
    // 模拟一个错误,让async函数的最后的回调函数接受
    timeout = timeout || 200;
    setTimeout(function(){
        callback(errMsg);
    },timeout);
};

exports.log = function(msg,obj){
    // 对console.log进行了封装，添加了秒钟的输出
    process.stdout.write(moment().format('ss.sss') + ' >>> ');
    if(obj !== undefined){
        console.log(process.stdout.write(msg));
        console.log(obj);
    }else{
        console.log(msg);
    }
};

exports.wait = function(mils){
    var now = new Date;
    while(new Date - now <= mils);
};