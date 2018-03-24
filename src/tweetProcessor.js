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
        root.TweetProcessor = factory();
    }
}(this, function () {

    /**
     * Class TweetProcessor
     * this Class is designed to process user data from tweet.txt file
     */

    var TweetData = require('./tweetData');
    var ErrorCode = require('./errorCode');
    const MAX_MESSAGE_LENGTH = 140;

    var TweetProcessor = function () {

    };
    var Pub = TweetProcessor.prototype;
    /**
     * Process Tweet Data from tweet.txt file
     ** @param tweetsData - the name of the text file
     *  @returns {object} - the userMap contains all users which name mapped to userData {name, followers, followings}
     */
    Pub.processData = function (tweetsData) {
        if (!Array.isArray(tweetsData)) {
            throw new Error(ErrorCode['20007']);
        }
        var tweets = [];

        for (var i in tweetsData) {
            var tweet = _processRecord(tweetsData[i]);
            tweets.push(tweet);
        }
        return tweets;
    };

    /**
     * private method _processRecord
     * processing each line of user record to update usersMap
     * @param record - line of record
     * @returns {TweetData} - the tweetData contains userName and message}
     */

    var _processRecord = function (record) {
        try {
            _validateRecord(record);

            var tweet = record.split("> ");
            var name = tweet[0].trim();
            var message = tweet[1].trim();

            return new TweetData(name, message);
        } catch (e) {
            console.log(e.message);
            throw e;
        }

    };

    /**
     * private method _validateRecord
     * checking all the rules for each line of user records
     * @param record - line of record
     */

    var _validateRecord = function (record) {
        _rule_containKeyWord(record, '> ');
        _rule_hasValidNameAndMessage(record, '> ');
    };

    /**
     * private method _rule_containKeyWord
     * check if this record contain key words ' follows '
     * if not then throw error 20001
     * @param record - line of record
     */

    var _rule_containKeyWord = function (record, keyword) {
        if (record.indexOf(keyword) === -1) {
            //"20001": "TWEET DATA -- Record do not contain key word ' > '",
            throw new Error(ErrorCode['20001']);
        }
    };

    /**
     * private method _rule_hasValidNameAndMessage
     * check if this record contain key words ' follows '
     * @param record - line of record
     */
    var _rule_hasValidNameAndMessage = function (record, keyword) {
        var tweet = record.split(keyword);
        if (tweet.length !== 2) {
            //"20002": "TWEET DATA -- Record do not have name or message section",
            throw new Error(ErrorCode['20002']);
        }

        if (tweet[0].trim() === "") {
            //"20003": "TWEET DATA -- Record do not have a valid name section",
            throw new Error(ErrorCode['20003']);
        }

        if (tweet[0].trim().match(/^\d/)) {
            //"20004": "TWEET DATA -- Record name starts with a number",
            throw new Error(ErrorCode['20004']);
        }

        if (tweet[1].trim() === "") {
            //"20005": "TWEET DATA -- Record do not valid message section",
            throw new Error(ErrorCode['20005']);
        }

        if (tweet[1].trim().length > MAX_MESSAGE_LENGTH) {
            //"20006": "TWEET DATA -- Record message is too long",
            throw new Error(ErrorCode['20006']);
        }
    };

    return TweetProcessor;
}));