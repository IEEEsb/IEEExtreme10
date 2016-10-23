var _ = require("lodash"),
    readline = require('readline');


var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var scenarios = 0;
var walls = 0;

var lineN = -1;

var solutions = [];

rl.on('line', (line) => {
   if (lineN == -1) {
        scenarios = parseInt(line);
    }
    if (lineN == 0) {
        walls = parseInt(line);
    }
    if (lineN > 0) {
        lineN = 0;
        var data = line.split(' ');

        var lastElem = undefined;
        for (var i = data.length - 1; i >= 0; i--) {
            if (data[i] === lastElem) {
                data.splice(i, 1);
            }
            lastElem = data[i];
        }
       if (data.length < 3) {
            solutions.push(data.length);
            return;
        }

        var iz = data[0];
        var der = data[1];

        if (data.length === 3) {
            if (data[2] === iz || data[2] === der) {
                solutions.push(2);
            } else {
                solutions.push(3);
            }
            return;
        }
        var counter = 2;
        var changes = 2;

        while (counter < data.length) {
            var next = data[counter];
            if (next !== iz && next !== der) {
                changes++;
                var nextIz = data.indexOf(iz, counter);
                if (nextIz == -1)
                    nextIz = 520;
                var nextDer = data.indexOf(der, counter);
                if (nextDer == -1)
                    nextDer = 520;
                if (nextIz < nextDer) {
                    der = next;
                } else {
                    iz = next;
                }
            }
            counter++;
        }
        solutions.push(changes);

        return;
    }
    lineN++;
});

rl.on('close', () => {
    solutions.forEach((solution) => {
        console.log(solution);
    });
});