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

    var UserData = function (name) {
        this.name = name;
        this.followings = [];
        this.followers = [];
    };

    var Pub = UserData.prototype;

    Pub.addFollower = function (follower) {
        if (this.followers.indexOf(follower) == -1) {
            this.followers.push(follower);
        }
    };

    Pub.addFollowing = function (following) {
        if (this.followings.indexOf(following) == -1) {
            this.followings.push(following);
        }
    };

    return UserData;
}));