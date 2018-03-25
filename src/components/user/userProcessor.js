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
        root.UserProcessor = factory();
    }
}(this, function () {

    /**
     * Class UserProcessor
     * this Class is designed to process user data from user.txt file
     */
    var UserData = require('./userData');
    var ErrorCode = require('../../enums/errorCode');

    /**
     * @Constructor Create UserProcessor
     */
    var UserProcessor = function () {

    };

    var Pub = UserProcessor.prototype;

    /**
     * Public function, Process user Data from user.txt file
     ** @param {Array} usersData - the raw data which represents each line of the text file
     *  @returns {object} usersMap - the userMap contains all users which with their name mapped to userData {name, followers, followings}
     */
    Pub.processData = function (usersData) {
        if (!Array.isArray(usersData)) {
            throw new Error(ErrorCode['10007']);
        }
        var usersMap = {};

        for (var i in usersData) {
            _processRecord(usersData[i], usersMap);
        }
        return usersMap;
    };

    /**
     * private method _processRecord
     * processing a single line of user record to update usersMap
     * @param {string} record - a single line of record
     * @param {object} usersMap - userMap contains all users which name mapped to userData {name, followers, followings}
     */
    var _processRecord = function (record, usersMap) {

        try {
            _validateRecord(record);

            var userArray = record.split(' follows ');
            var followerName = userArray[0].trim();
            var leaderNames = userArray[1].split(',');
            var follower = _createUser(followerName, usersMap);

            for (var i in leaderNames) {
                var LeaderName = leaderNames[i].trim();
                var leader = _createUser(LeaderName, usersMap);
                leader.addFollower(followerName);
                follower.addLeader(LeaderName);
            }
        } catch (e) {
            console.error(e.message);
            throw e;
        }
    };

    /**
     * private method _validateRecord
     * checking all the rules for each line of user records
     * @param {string} record - a single line of record
     */
    var _validateRecord = function (record) {
        _rule_containKeyWord(record, ' follows ');
        _rule_hasValidFollowerAndLeaders(record, ' follows ');
    };

    /**
     * private method _rule_containKeyWord
     * check if this record contain key words ' follows '
     * @param {string} record - a single line of record
     */
    var _rule_containKeyWord = function (record, keyword) {
        if (record.indexOf(keyword) === -1) {
            //"10001": "USER DATA -- Record do not contain key word ' follows '",
            throw new Error(ErrorCode['10001']);
        }
    };

    /**
     * private method _rule_hasValidFollowerAndLeaders
     * check if this record has valid name and message
     * if not then throw corresponding Errors
     * @param {string} record - a single line of tweet record
     * @param {string} keyword - keyword which must exist in the record
     */
    var _rule_hasValidFollowerAndLeaders = function (record, keyword) {
        var userArray = record.split(keyword);
        if (userArray.length !== 2) {
            //"10002": "USER DATA -- Record do not have a follower or followings section",
            throw new Error(ErrorCode['10002']);
        }

        if (userArray[0].trim() === "") {
            //"10003": "USER DATA -- Record do not have a valid name section",
            throw new Error(ErrorCode['10003']);
        }

        if (userArray[0].trim().match(/^\d/)) {
            //"10004": "USER DATA -- Record name starts with a number",
            throw new Error(ErrorCode['10004']);
        }

        if (userArray[1].trim() === "") {
            //"10005": "USER DATA -- Record do not valid following section",
            throw new Error(ErrorCode['10005']);
        }

        if (userArray[1].trim().match(/^\d/)) {
            //"10006": "USER DATA -- Record followings section starts with a number",
            throw new Error(ErrorCode['10006']);
        }
    };


    /**
     * private method _createUser
     * check if user exist, if not, then create a new userData add it to the map
     * @param {string} name - tweeter's name
     * @param {object} usersMap - userMap contains all users which name mapped to userData {name, followers, followings}
     * @returns {UserData} userData - a UserData contains {name, followers, followings}
     */
    var _createUser = function (name, usersMap) {
        if (usersMap[name] === undefined) {
            usersMap[name] = new UserData(name);
        }
        return usersMap[name];
    };

    return UserProcessor;
}));