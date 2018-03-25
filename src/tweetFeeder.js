'use strict';
/**
 * AMD, CommonJS, Global compatible Script Wrapper
 * https://github.com/umdjs/umd
 */
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
        root.TweetFeeder = factory();
    }
}(this, function () {

    /** Class TweetFeeder is the main file for this application  */


    var UserProcessor = require('./components/user/userProcessor');
    var TweetProcessor = require('./components/tweet/tweetProcessor');
    const CRLF = '\r\n';
    const LF = '\n';

    /**
     * @Constructor Create TweetFeeder
     */
    var TweetFeeder = function () {

    };

    var Pub = TweetFeeder.prototype;

    /**
     * public function process tweet Feeds
     * @param {string} userData - raw data from user file
     * @param {string} tweetData - raw data from tweets file
     * @return {string} the result with tweeters in alphabetical order with their tweets and their follower's tweets
     */
    Pub.processFeed = function (userData, tweetData) {
        var userMap = _processUserData(userData);
        var tweets = _processTweetData(tweetData);
        return _getResults(userMap, tweets);
    };


    /**
     * Private function, process the raw user data
     * @param {string} data - the raw user data
     * @return {object} userMap - map of user name to user data, contains followings and follower relationships
     */
    var _processUserData = function (data) {
        var userData = _getDataArray(data);
        var userProcessor = new UserProcessor();
        var userMap = userProcessor.processData(userData);
        return userMap;
    };


    /**
     * Private function, process the raw tweet data
     * @param {string} data - the raw tweet data
     * @return {Array} tweets - array of tweeted messages, contains tweeter's name and message
     */
    var _processTweetData = function (data) {
        var tweetData = _getDataArray(data);
        var tweetProcessor = new TweetProcessor();
        var tweets = tweetProcessor.processData(tweetData);
        return tweets
    };

    /**
     * Private function, split the raw data into an array separated either by CRLF or LF
     * @param {string} data - the raw data
     * @return {Array} data array - array that contains each line in the text file
     */
    var _getDataArray = function (data) {
        var lineSeparator = data.indexOf(CRLF) > -1 ? CRLF : LF;
        return data.split(lineSeparator).filter(Boolean);
    };

    /**
     * Private function, _getResults. Print the result of tweet messages
     * @param {object} userMap - - map of user name to user data, contains followings and follower relationships
     * @param {Array} tweets - array of tweeted messages, contains tweeter's name and message
     * @return {string} the result with tweeters in alphabetical order with their tweets and their follower's tweets
     */
    var _getResults = function (userMap, tweets) {
        var keys = Object.keys(userMap);
        keys.sort();

        var result = "";
        for (var i in keys) {
            var userName = keys[i];
            result = result + userName + '\r\n';
            for (var j in tweets) {
                var tweet = tweets[j];
                if (tweet.name == userName || (userMap[userName].followings && userMap[userName].followings.indexOf(tweet.name)) > -1) {
                    result = result + '@' + tweet.name + ': ' + tweet.message + '\r\n';
                }
            }
        }
        return result;
    };
    return TweetFeeder;
}));