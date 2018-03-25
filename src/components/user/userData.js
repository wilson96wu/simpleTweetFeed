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
        root.UserData = factory();
    }
}(this, function () {

    /** Class UserData represent a tweeter's user information */

    var ErrorCode = require('../../enums/errorCode');
    /**
     * @Constructor Create UserData
     * @param {string} name - tweeter's name
     */
    var UserData = function (name) {
        try {
            _validateName(name);
            this.name = name;
            this.followings = [];
            this.followers = [];
        }
        catch (e){
            console.error(e.message);
            throw e;
        }
    };

    var Pub = UserData.prototype;

    /**
     * Public function, add a follower to this user
     * if the follower does not exist, push into follower's array
     * @param {string} follower - follower's name
     */
    Pub.addFollower = function (follower) {
        try {
            _validateName(follower);
            if (this.followers.indexOf(follower) == -1) {
                this.followers.push(follower);
            }
        }
        catch (e){
            console.error(e.message);
            throw e;
        }
    };

    /**
     * Public function, add a person whom this user is following
     * if the person does not exist, push into following's array
     * @param {string} leader - leader's name
     */
    Pub.addLeader = function (leader) {
        try {
            _validateName(leader);
            if (this.followings.indexOf(leader) == -1) {
                this.followings.push(leader);
            }
        }
        catch (e){
            console.error(e.message);
            throw e;
        }
    };

    /**
     * private method _validateName
     * checking if a valid name is provided
     * @param {string} name - a user name
     */
    var _validateName = function (name) {
        if (!name || name == "" || typeof name !== 'string' || (typeof name === 'string' && name.match(/^\d/))) {
            throw new Error(ErrorCode['10008']);
        }
    };
    return UserData;
}));