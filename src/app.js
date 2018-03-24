'use strict';
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
        /* istanbul ignore next */
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.user = factory();
    }
}(this, function () {
    var fileUtils = require('./fileUtils');
    var UserProcessor = require('./userProcessor');
    var TweetProcessor = require('./tweetProcessor');
    const userFilePath = './data/user.txt';
    const tweetFilePath = './data/tweet.txt';
    var fileSystem;

    var App = function (fs) {
        fileSystem = fs;
    };

    var Pub = App.prototype;

    Pub.start = function () {
        var userMap = _processUserFile(userFilePath);
        var tweets = _processTweetFile(tweetFilePath);
        _printResults(userMap, tweets);
    };


    var _processUserFile = function (path) {
        var userData = fileUtils.readFile(path, fileSystem);
        var userProcessor = new UserProcessor();
        var userMap = userProcessor.processData(userData);
        return userMap;
    };

    var _processTweetFile = function (path) {
        var tweetData = fileUtils.readFile(path, fileSystem);
        var tweetProcessor = new TweetProcessor();
        var tweets = tweetProcessor.processData(tweetData);
        return tweets
    };

    var _printResults = function (userMap, tweets) {
        var keys = Object.keys(userMap);
        keys.sort();

        for (var i in keys) {
            var userName = keys[i];
            console.log(userName);
            for (var j in tweets) {
                var tweet = tweets[j];
                if (tweet.name == userName || (userMap[userName].followings && userMap[userName].followings.indexOf(tweet.name)) > -1) {
                    console.log('@' + tweet.name + ': ' + tweet.message);
                }
            }
        }
    };
    return App;
}));