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
        root.TweetData = factory();
    }
}(this, function () {

    /** Class TweetData represent a tweet message  */

    var ErrorCode = require('../../enums/errorCode');
    const MAX_MESSAGE_LENGTH = 140;

    /**
     * @Constructor Create TweetData
     * @param {string} name - tweeter's name
     * @param {string} message - tweeter's name
     */
    var TweetData = function (name, message) {
        try {
            if (arguments.length !== 2) {
                //"20008": "TWEET DATA -- Not right number of arguments for Tweet data"
                throw new Error(ErrorCode['20008']);
            }
            _validateInput(name, message);

            this.name = name;
            this.message = message;

        } catch (e) {
            console.error(e.message);
            throw e;
        }
    };

    /**
     * private method _validateInput
     * validate tweeter's name and message according to the rules
     * @param {string} name - tweeter's name
     * @param {string} message - tweeter's name
     */
    var _validateInput = function (name, message) {
        _validateName(name);
        _validateMessage(message);
    };


    /**
     * private method _validateName
     * validate tweeter's name according to the rules
     * throw error 20003 if it is empty or not a string value
     * throw error 20004 if the name starts with a number
     * @param {string} name - tweeter's name
     */
    var _validateName = function (name) {
        if (name == "" || typeof name !== 'string') {
            //"20003": "Error 20003: TWEET DATA -- Record do not have a valid name section",
            throw new Error(ErrorCode['20003']);
        }
        if (name.match(/^\d/)) {
            //"20004": "TWEET DATA -- Record name starts with a number",
            throw new Error(ErrorCode['20004']);
        }
    };

    /**
     * private method _validateName
     * validate tweeter's message according to the rules
     * throw error 20005 if it is empty or not a string value
     * throw error 20006 if the message is longger than 140 characters
     * @param {string} name - tweeter's name
     */
    var _validateMessage = function (message) {
        if (message == "" || typeof message !== 'string') {
            //"20005": "TWEET DATA -- Record do not valid message section",
            throw new Error(ErrorCode['20005']);
        }
        if (message.length > MAX_MESSAGE_LENGTH) {
            //"20006": "TWEET DATA -- Record message is too long",
            throw new Error(ErrorCode['20006']);
        }
    };

    return TweetData;
}));