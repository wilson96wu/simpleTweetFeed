'use strict';
/**
 * Created by WilsonW on 3/23/2018.
 */
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
        root.ErrorCode = factory();
    }
}(this, function () {

    /**
     *  Definition of all the Error code
     *  Range of User Error data is between 10001 - 19999
     *  Range of tweet Error data is between 20001 - 29999
     */
    return {
        "10001": "Error 10001: USER DATA -- Record do not contain keyword ' follows '",
        "10002": "Error 10002: USER DATA -- Record do not have a follower or followings section",
        "10003": "Error 10003: USER DATA -- Record do not have a valid name section",
        "10004": "Error 10004: USER DATA -- Record name starts with a number",
        "10005": "Error 10005: USER DATA -- Record do not have a valid following section",
        "10006": "Error 10006: USER DATA -- Record followings section starts with a number",
        "10007": "Error 10007: USER DATA -- Users data is not valid type, need an Array",
        "10008": "Error 10008: USER DATA -- Valid name is not provided when create Users data",

        "20001": "Error 20001: TWEET DATA -- Record do not contain keyword ' > '",
        "20002": "Error 20002: TWEET DATA -- Record do not have name or message section",
        "20003": "Error 20003: TWEET DATA -- Record do not have a valid name section",
        "20004": "Error 20004: TWEET DATA -- Record name starts with a number",
        "20005": "Error 20005: TWEET DATA -- Record do not valid message section",
        "20006": "Error 20006: TWEET DATA -- Record message is too long",
        "20007": "Error 20007: TWEET DATA -- Tweets data is not valid type, need an Array",
        "20008": "Error 20008: TWEET DATA -- Not right number of arguments for Tweet data",

        "30001": "Error 30001: Feeder -- Not right number of arguments for Feeder"

    };
}));
