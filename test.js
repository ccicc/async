var async = require('async');
var fs = require('fs');

var files = ['test1.txt','test2.txt','test3.txt'];

var obj = {
    f1: 'test1.txt',
    f2: 'test2.txt',
    f3: 'test3.txt'
};


async.reduce(files,'hello',function(total,item,callback){
    fs.readFile(item,function(err,res){
        if(err)callback(err);
        callback(null,total + res);
    });
},function(err,res){
    console.log(res);
});