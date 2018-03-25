/**
 * Created by WilsonW on 3/23/2018.
 */
var chai = require('../node_modules/chai/chai');
var expect = chai.expect;
var should = chai.should();
var TweetFeeder = require('../src/tweetFeeder');
var ErrorCode = require('../src/enums/errorCode');

describe("TweetFeeder test suite", function () {
    it("should have a public method processFeed", function () {
        var feeder = new TweetFeeder();
        expect(feeder.processFeed).to.be.a('function');
    });

    describe('Error handling', function () {
        var feeder = new TweetFeeder();

        it("should throw an error if no params is provided", function () {
            should.throw(function () {
                    feeder.processFeed();
                },
                ErrorCode['30001']);
        });

        it("should throw an error if three params are passed", function () {
            should.throw(function () {
                    feeder.processFeed('1', 'b', 'c');
                },
                ErrorCode['30001']);
        });
    });

    describe('Test cases with two tweeters', function () {
        var feeder = new TweetFeeder();

        it("should produce no result if no tweeter and no tweet ", function () {
            var userData = "";
            var tweetData = "";
            var result = "";

            expect(feeder.processFeed(userData, tweetData)).to.equal(result);
        });

        it("should produce no result if no tweet", function () {
            var userData = "b follows a\r\n";
            var tweetData = "";
            var result = "";

            expect(feeder.processFeed(userData, tweetData)).to.equal(result);
        });

        it("should produce no result if no tweeters", function () {
            var userData = "";
            var tweetData = "a> 1";
            var result = "";

            expect(feeder.processFeed(userData, tweetData)).to.equal(result);
        });

        it("should produce no result if no tweet is tweeted by one of the tweeters in the Tweeters list", function () {
            var userData = "b follows a";
            var tweetData = "c> 1\r\n";
            var result = "";

            expect(
                feeder.processFeed(userData, tweetData)
            ).to.equal(result);
        });

        it("should produce right result with one tweet", function () {
            var userData = 'b follows a\r\n';
            var tweetData = 'a> 1\r\n';
            var result = "a\r\n" +
                "@a: 1\r\n" +
                "b\r\n" +
                "@a: 1\r\n";

            expect(feeder.processFeed(userData, tweetData)).to.equal(result);
        });

        it("should produce right result with two tweets", function () {
            var userData = "b follows a\r\n";
            var tweetData = "a> 1\r\na> 2";
            var result = "a\r\n@a: 1\r\n@a: 2\r\nb\r\n@a: 1\r\n@a: 2\r\n";

            expect(feeder.processFeed(userData, tweetData)).to.equal(result);
        });

        it("should produce right result with two tweets, but one of the tweet is not tweeted by anyone in the tweeters list", function () {
            var userData = "b follows a\r\n";
            var tweetData = "a> 1\r\nc> 2";
            var result = "a\r\n@a: 1\r\nb\r\n@a: 1\r\n";

            expect(feeder.processFeed(userData, tweetData)).to.equal(result);
        });
    });

})
;
