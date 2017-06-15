var fs = require('fs');
var async = require('async');

var files = ['test1.txt', 'test2.txt', 'test3.txt'];


/*
 *  Collections API   用于操作异步函数的集合
*/

/*** contact ***/

// async.concat()  并行执行异步操作，异步的级联结果作为数组传入回调
async.concat(files, fs.readFile, function (err, res) {
    console.log(res.toString());
});
// async.concatSeries() 串行执行异步操作,其他与concat()相同，返回结果顺序相同


/*** detect ***/

// async.find()
// async.detect() 并行执行异步函数,将最先完成的异步操作中数组的那项传入回调，返回的是原集合中的值
async.detect(files, fs.readFile, function (err, res) {
    console.log(res);
});

// async.findLimit()
// async.detectLimit() 与detect()相同，不同的是可以选择一次异步操作的最大数量
async.detectLimit(files, 2, fs.readFile, function (err, res) {
    console.log(res);
});

// async.findSeries()
// async.detectSeries() 串行执行异步操作，一次只运行一个异步函数
async.detectSeries(files, fs.readFile, function (err, res) {
    console.log(res);
});


/*** each ***/

// async.forEach()
// async.each()  对集合中的每个元素执行异步操作,回调只接受err参数     要将结果传入回调，可使用async.map()
async.each(files, function (file, callback) {
    fs.stat(file, function (err, stat) {
        if (err) callback(err);
        if (stat.isFile()) {
            console.log('true');
        } else {
            console.log('false');
        }
    });
}, function (err) {
    console.log(err);
});
// async.eachLimit()        // async.forEachLimit()
// async.eachSeries()       // async.forEachSeries()


/*** eachOf ***/

// async.forEachOf()
// async.eachOf()  与async.each()相同,但会向异步操作函数中传入索引值
async.eachOf(files, function (file, index, callback) {
    console.log(file);
    console.log(index);
    callback();
}, function (err) {
    if (err) {
        console.error(err.message);
    }
});
// async.eachOfLimit()      // async.forEachOfLimit()
// async.eachOfSeries()     // async.forEachOfSeries()


/*** every ***/

// async.all()      
// async.every()  所有异步操作成功后向回调函数传入true，否则传入false
async.every(files, function (file, callback) {
    fs.access(file, function (err) {
        callback(null, !err);
    });
}, function (err, result) {
    console.log(result);    // true
});

// async.everyLimit()       // async.allLimit()
// async.everySeries()      // async.allSeries()


/*** async.filter ***/

// async.select()
// async.filter()  向回调函数中传入符合异步函数条件的原集合中的值组成的数组
async.filter(files, function (file, callback) {
    fs.stat(file, function (err, stat) {
        if (err) {
            callback(err);
        }
        callback(null, stat.isFile());
    });
}, function (err, res) {
    if (err) console.error(err);
    console.log(res);   // ['test1.txt','test2.txt','test3.txt']
});

// async.filterLimit()      // async.selectLimit()
// async.filterSeries()     // async.selectSeries()

/*** async.groupBy ***/

// async.groupBy()  对集合分组,返回一个对象,键名为异步操作处理后的值,键值为集合中键名所对应的元素组成的数组
async.groupBy(files, function (item, callback) {
    fs.readFile(item, function (err, res) {
        callback(null, res.toString());
    });
}, function (err, res) {
    console.log(res); // {test1: ['test1.txt','test2.txt'],test3: ['test3.txt']}
});

// async.groupByLimit()
// async.groupBySeries()


/*** async.map ***/

// async.map() 返回经过异步函数处理后的数组
async.map(files, function (file, callback) {
    fs.readFile(file, function (err, res) {
        callback(err, res.toString());
    });
}, function (err, res) {
    if (err) {
        console.log(err);
    }
    console.log(res);   // ['test1','test1','test3']
});

// async.mapLimit()
// async.mapSeries()

/*** async.mapValues ***/

// async.mapValues() 针对对象的map函数,返回的也是对象

var fsObj = {
    f1: 'test1.txt',
    f2: 'test2.txt',
    f3: 'test3.txt'
};
// 需要向异步函数中传入键名
async.mapValues(fsObj, function (item, key, callback) {
    console.log(key);
    fs.readFile(item, function (err, res) {
        if(err)callback(err);
        callback(null,res.toString() + '-' + key);
    });
}, function (err, res) {
    console.log(res);    // {f1: 'test1-f1', f2: 'test1-f2' ,f2: 'test3-f3'} 
});


// async.mapValuesLimit()
// async.mapValuesSeries()


/*** async.reduce ***/

// async.reduce()   将异步串行操作后的值叠加
async.reduce(files, 'hello,', function (init, file, callback) {
    fs.readFile(file, function (err, res) {
        callback(err, init + res.toString());
    });
}, function (err, res) {
    console.log(res);  // hello,test1test1test3
});

// async.reduceRight() 顺序相反


/*** async.reject ***/

// async.reject()  与async.filter()作用相反，排除异步操作为真的值
async.reject(files, function (item, callback) {
    fs.readFile(item, function (err, res) {
        callback(err, res.toString() === 'test1');
    });
}, function (err, res) {
    if (err) console.log(err);
    console.log(res);   // ['test3.txt']
});

// async.rejectLimit()
// async.rejectSeries()


/*** async.some ***/

// async.some()   与async.every()相反,只要有一个异步操作返回true，则结果为true
async.some(files, function (item, callback) {
    fs.readFile(item, function (err, res) {
        callback(err, res.toString() === 'test3');
    });
}, function (err, res) {
    console.log(res);  // true
});

// async.someLimit()
// async.someSeries()


// async.sortBy()  根据异步操作的结果进行排序,正序
async.sortBy(files, function (file, callback) {
    fs.stat(file, function (err, stat) {
        callback(err, stat.mtime);
    });
}, function (err, res) {
    console.log(res);  // 返回经过排序后的数组
});

async.sortBy([1, 3, 2, 5, 4, 7, 6], function (item, callback) {
    process.nextTick(function () {
        callback(null, item);
    });
}, function (err, res) {
    console.log(res);  // [1,2,3,4,5,6,7]
});


// async.transform()  对对象或数组进行串行迭代，并可以改变集合类型

async.transform([1, 2, 3, 4], function (arr, item, index, callback) {
    process.nextTick(function () {
        arr.push(item * 10);
        callback(null);
    });
}, function (err, res) {
    console.log(res); // [10,20,30,40]
});

async.transform({ 'a': 1, 'b': 2, 'c': 3 }, function (obj, value, key, callback) {
    process.nextTick(function () {
        obj[key] = value * 3;
        callback(null);
    });
}, function (err, res) {
    console.log(res);  // {'a': 3,'b': 6,'c': 9}
});

async.transform({ 'a': 1, 'b': 2, 'c': 3 },[],function(arr,item,index,callback){
    process.nextTick(function(){
        arr.push(item * 2);
        callback(null);
    });
},function(errr,res){
    console.log(res);  // [2,4,6]
});