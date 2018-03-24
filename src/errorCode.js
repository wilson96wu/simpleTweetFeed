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
     */
    var ErrorCode = {
        "10001": "USER DATA -- Record do not contain key word ' follows '",
        "10002": "USER DATA -- Record do not have a follower or followings section",
        "10003": "USER DATA -- Record do not have a valid name section",
        "10004": "USER DATA -- Record name starts with a number",
        "10005": "USER DATA -- Record do not valid following section",
        "10006": "USER DATA -- Record followings section starts with a number",
        "10007": "USER DATA -- Users data is not valid type, need an Array",

        "20001": "TWEET DATA -- Record do not contain key word ' > '",
        "20002": "TWEET DATA -- Record do not have name or message section",
        "20003": "TWEET DATA -- Record do not have a valid name section",
        "20004": "TWEET DATA -- Record name starts with a number",
        "20005": "TWEET DATA -- Record do not valid message section",
        "20006": "TWEET DATA -- Record message is too long",
        "20007": "TWEET DATA -- Tweets data is not valid type, need an Array"
    }
    return ErrorCode;
}));
