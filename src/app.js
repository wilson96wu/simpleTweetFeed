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

    /** Class App is the main file for this application  */

    var fileUtils = require('./fileUtils');
    var UserProcessor = require('./userProcessor');
    var TweetProcessor = require('./tweetProcessor');
    const userFilePath = './data/user.txt';
    const tweetFilePath = './data/tweet.txt';
    var fileSystem;

    /**
     * Create App, Constructor
     * @param {fileSystem} fs - file system that read and write files
     */
    var App = function (fs) {
        fileSystem = fs;
    };

    var Pub = App.prototype;

    /**
     * Start the App
     * process input user file and tweet file and print result in console
     */
    Pub.start = function () {
        var userMap = _processUserFile(userFilePath);
        var tweets = _processTweetFile(tweetFilePath);
        _printResults(userMap, tweets);
    };


    /**
     * Private function, process the user file
     * @param {string} path - path to user file
     * @return {object} userMap - map of user name to user data, contains followings and follower relationships
     */
    var _processUserFile = function (path) {
        var userData = fileUtils.readFile(path, fileSystem);
        var userProcessor = new UserProcessor();
        var userMap = userProcessor.processData(userData);
        return userMap;
    };

    /**
     * Private function, process the tweet file
     * @param {string} path - path to tweet file
     * @return {Array} tweets - array of tweeted messages, contains tweeter's name and message
     */
    var _processTweetFile = function (path) {
        var tweetData = fileUtils.readFile(path, fileSystem);
        var tweetProcessor = new TweetProcessor();
        var tweets = tweetProcessor.processData(tweetData);
        return tweets
    };

    /**
     * Private function, print the result of tweet messages
     * @param {object} userMap - - map of user name to user data, contains followings and follower relationships
     * @param {Array} tweets - array of tweeted messages, contains tweeter's name and message
     */
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