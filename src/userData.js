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
        root.user = factory();
    }
}(this, function () {

    /** Class UserData represent a tweeter's user information */

    /**
     * Create UserData, Constructor
     * @param {string} name - tweeter's name
     */
    var UserData = function (name) {
        this.name = name;
        this.followings = [];
        this.followers = [];
    };

    var Pub = UserData.prototype;

    /**
     * Public function, add a follower to this user
     * if the follower does not exist, push into follower's array
     * @param {string} follower - follower's name
     */
    Pub.addFollower = function (follower) {
        if (this.followers.indexOf(follower) == -1) {
            this.followers.push(follower);
        }
    };

    /**
     * Public function, add a person whom this user is following
     * if the person does not exist, push into following's array
     * @param {string} leader - leader's name
     */
    Pub.addLeader = function (leader) {
        if (this.followings.indexOf(leader) == -1) {
            this.followings.push(leader);
        }
    };

    return UserData;
}));