var _ = require("lodash"),
    readline = require('readline'),
    haversine = require('haversine');


var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var state = -1;
var location;
var kilometers;
var agenda = {};
var numbers = [];

var parse = function (dateTimeStr) {
    var splits = dateTimeStr.split(" ");
    var date = splits[0].split("/");
    var time = splits[1].split(":");
    return new Date(parseInt(date[2]), parseInt(date[0]), parseInt(date[1]), parseInt(time[0]), parseInt(time[1]));
}

rl.on('line', (line) => {
    switch (state) {
        case -1:
            var latlon = line.split(",");
            location = { latitude: parseFloat(latlon[0]), longitude: parseFloat(latlon[1]) };
            state = 0;
            break;
        case 0:
            kilometers = parseFloat(line);
            state = 1;
            break;
        case 1:
            state = 2;
            break;
        case 2:
            var splits = line.split(",");
            var dateTimeStr = splits[0];
            var latlon = { latitude: parseFloat(splits[1]), longitude: parseFloat(splits[2]) };
            var phone = splits[3];
            var date = parse(dateTimeStr);
            if (!agenda[phone] || (date > agenda[phone].date)) {
                agenda[phone] = {
                    phone: phone,
                    location: latlon,
                    date: date
                };
            }
            break;
    }
});

var compute = function () {
    var array = Object.keys(agenda).map(name => agenda[name]);
    array = array.filter(entry => {
        var distance = haversine(entry.location, location, { unit: 'meter' });
        return distance < kilometers * 1000;
    })
    numbers = array.map(entry => parseInt(entry.phone));
}

rl.on('close', () => {
    compute();
    numbers.sort((a, b) => { return a - b });
    console.log(numbers.join(","))
});