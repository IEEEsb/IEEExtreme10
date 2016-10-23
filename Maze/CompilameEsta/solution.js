var _ = require("lodash"),
    readline = require('readline');


var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var map = [];
var state = -1;

function createPoint(x, y) {
    return { x: x, y: y };
}

function isEqual(point1, point2) {
    return point1.x === point2.x && point1.y === point2.y;
}

function createIndex(point){
    return point.x+","+point.y;
}

function vecinos(point) {
    return [
        createPoint(point.x + 1, point.y),
        createPoint(point.x, point.y + 1),
        createPoint(point.x - 1, point.y),
        createPoint(point.x, point.y - 1)].filter(elem => {
            return elem.x > -1 && elem.y > -1 && elem.x < map.length && elem.y < map[0].length;
        });
}


var path = {};

var isEnd = function (point) {
    return point.x === 0;
}

var isStart = function (point) {
    return point.x === size - 1;
}


var size;

var finished = false;

var apertures = 0;

var investiga = function (newPoint) {
    map[newPoint.x][newPoint.y] = true;
    var cercanos = vecinos(newPoint);
    if (isStart(newPoint) || (_.findIndex(cercanos, cercano => {
        return path[createIndex(cercano)];
    }) != -1)) {
        path[createIndex(newPoint)]=newPoint;
        cercanos.forEach(vecino=>{
            if(map[vecino.x][vecino.y]&&!path[createIndex(vecino)]){
                if(isEnd(vecino)){
                    finished = true;
                    return;
                }else{
                    investiga(vecino);
                }
            }
        });
    }
}

rl.on('line', (line) => {
    switch (state) {
        case -1:
            size = parseInt(line);
            for (var i = 0; i < size; i++) {
                var arr = [];
                for (var j = 0; j < size; j++) {
                    arr.push(false);
                }
                map.push(arr);
            }
            state = 0;
            break;
        case 0:
            if(parseInt(line)===-1){
                console.log("-1");
                state =2;
                return;
            }
            var splits = line.split(" ");
            var newPoint = createPoint(parseInt(splits[0]) - 1, parseInt(splits[1]) - 1);
            apertures++;
            investiga(newPoint);
            if(finished){
                console.log(apertures);
                state =2;
                return;
            }
            break;
    }
});
