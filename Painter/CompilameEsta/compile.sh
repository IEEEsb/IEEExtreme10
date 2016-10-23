#!/bin/bash
#browserify solution.js --node --exclude lodash --exclude bignumber.js --exclude jquery --exclude underscore -t  [ babelify --presets [ es2015  ] ]| uglifyjs -c  > bundle.js
browserify solution.js --node --exclude lodash --exclude bignumber.js --exclude jquery --exclude underscore -t  [ babelify --presets [ es2015  ] ] > bundle.js