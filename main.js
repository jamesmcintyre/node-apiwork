'use strict';

var http = require('http');
var _ = require('lodash');
var md5 = require('md5');

var server = http.createServer(function(req, res) {

    var reqArray = req.url.match(/[^/]+/g);

        switch(reqArray[0]) {
        case 'math':
            if (reqArray[1] === 'square'){
                var toSquare = parseInt(reqArray[2]);
                res.end( toSquare * toSquare+'\n');
            }
            else if (reqArray[1] === 'add'){
                reqArray.splice(0,2);
                var numArray = reqArray.map(Number);
                var sumResult = numArray.reduce(function(prevVal, curVal){
                    return ( prevVal + curVal );
                });
                res.end(sumResult+'\n');
            }
        case 'gravatar':
            var hashedEmail = md5(email);
            var email = reqArray[1];
            var response = 'http://www.gravatar.com/avatar/'+hashedEmail;
            res.end(response+'\n');
            break;

        case 'sentence':
            var wordsArray = reqArray[1].split('%20');
            var numOfWords = wordsArray.length;
            var numOfSpaces = numOfWords - 1;
            var numOfLetters = wordsArray.join('').split('').length;
            var resultObj = {
                letters: numOfLetters,
                spaces: numOfSpaces,
                words: numOfWords
            };
            var resultObjStringified = JSON.stringify(resultObj);
            res.end(resultObjStringified+'\n');

            break;
        default:
            res.end('i can has no instruction?');
            break;
        }


});

server.listen(4000);
