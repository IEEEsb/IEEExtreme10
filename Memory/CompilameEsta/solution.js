var _ = require("lodash"),
    readline = require('readline'),
    LRU = require("lru-cache");


var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var state = -1;

var accesses = 0;
var pages = 0;
var size = 0;

var accessesSaved = [];

var compute = function () {
    var lruDisposals = 0;
    var fifoDisposals = 0;
    var options = {
        max: pages
        , length: function (n, key) { return 1 }
        , dispose: function (key, n) {
            lruDisposals++;
        }
        , maxAge: 1000 * 60 * 60 * 60
    }
        , cache = LRU(options);
    var fifo = [];
    accessesSaved.forEach(addr => {
        var page = Math.floor(addr / size);
        if (cache.has(page))
            cache.get(page)
        else
            cache.set(page, "holi");
        if (fifo.indexOf(page) == -1) {
            fifo.push(page);
            if (fifo.length > pages) {
                fifo.splice(0, 1);
                fifoDisposals++;
            }
        }
    });
    console.log(lruDisposals<fifoDisposals?"yes":"no",fifoDisposals+,lruDisposals);
}


rl.on('line', (line) => {
    switch (state) {
        case -1:
            state = 0;
            break;
        case 0:
            var splits = line.split(" ");

            pages = parseInt(splits[0]);
            size = parseInt(splits[1]);
            accesses = parseInt(splits[2]);

            state = 1;
            break;
        case 1:
            accessesSaved.push(parseInt(line))
            if (accessesSaved.length === accesses) {
                compute();
                state = 0;
                accessesSaved = [];
            }
            break;
    }
});

