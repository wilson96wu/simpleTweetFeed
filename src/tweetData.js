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

    /**
     * Create TweetData, Constructor
     * @param {string} name - tweeter's name
     * @param {string} message - tweeter's name
     */
    var TweetData = function (name, message) {
        this.name = name;
        this.message = message;
    };

    return TweetData;
}));