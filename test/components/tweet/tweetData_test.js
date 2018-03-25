/**
 * Created by WilsonW on 3/23/2018.
 */
var chai = require('chai');
var should = chai.should();
var TweetData = require('../../../src/components/tweet/tweetData');
var ErrorCode = require('../../../src/enums/errorCode');


describe("TweetData test suite", function () {
    it("should throw an error if no params is provided", function () {
        should.throw(function () {
                new TweetData();
            },
            ErrorCode['20008']);
    });

    it("should throw an error if three params are passed", function () {
        should.throw(function () {
                new TweetData('1', 'b', 'c');
            },
            ErrorCode['20008']);
    });

    it("should throw an error if number is passed as name", function () {
        should.throw(function () {
                new TweetData(1, 'b');
            },
            ErrorCode['20003']);
    });

    it("should throw an error if name starts with a number", function () {
        should.throw(function () {
                new TweetData('1a', 'b');
            },
            ErrorCode['20004']);
    });

    it("should throw an error if it is an empty message", function () {
        should.throw(function () {
                new TweetData('a', '');
            },
            ErrorCode['20005']);
    });

    it("should throw an Error if message is longer than 140 characters", function () {
        should.throw(function () {
                new TweetData('a', 'this is a very loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooog message');
            },
            ErrorCode['20006']);
    });

});