/**
 * Created by WilsonW on 3/23/2018.
 */

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var TweetProcessor = require('../../../src/components/tweet/tweetProcessor');
var ErrorCode = require('../../../src/enums/errorCode');

describe("TweetProcessor test suite", function () {

    it("should have a public method processData", function () {
        var processor = new TweetProcessor();
        expect(processor.processData).to.be.a('function');
    });

    describe('Error handling', function () {

        var processor = new TweetProcessor();

        it("should through an Error when pass string instead of Array", function () {
            var testData = "Alan> If you have a procedure with 10 parameters, you probably missed some.";
            should.throw(function () {
                    processor.processData(testData);
                },
                ErrorCode['20007']);
        });

        it("should through an Error if no key word '> ' in the record", function () {
            var testData = [" Alan"];
            should.throw(function () {
                    processor.processData(testData);
                },
                ErrorCode['20001']);
        });

        it("should through an Error if no key word '> ' in the record", function () {
            var testData = [" Alan>"];
            should.throw(function () {
                    processor.processData(testData);
                },
                ErrorCode['20001']);
        });

        it("should not through an Error if key word '> ' is in the record", function () {
            var testData = [" Alan> 1"];
            should.not.throw(function () {
                processor.processData(testData);
            });
        });

        it("should through an Error if no message in the record", function () {
            var testData = [" Alan> "];
            should.throw(function () {
                    processor.processData(testData);
                },
                ErrorCode['20005']);
        });
    });

    describe("handle a single record", function () {

        var testData, processor;
        beforeEach(function () {
            testData = ["Alan> If you have a procedure with 10 parameters, you probably missed some."];
            processor = new TweetProcessor();
        });

        it("should return a array", function () {
            expect(processor.processData(testData)).to.be.a('array');
        });

        it("should create one tweetData", function () {
            expect(processor.processData(testData)).have.lengthOf(1);
        });

        it("should have correct user name", function () {
            var tweets = processor.processData(testData);
            expect(tweets[0].name).to.equal('Alan');
        });

        it("should have correct message", function () {
            var tweets = processor.processData(testData);
            expect(tweets[0].message).to.equal('If you have a procedure with 10 parameters, you probably missed some.');
        });
    });

    describe("handle two records", function () {

        var testData, processor;
        beforeEach(function () {
            testData = [
                "Alan> If you have a procedure with 10 parameters, you probably missed some.",
                "Ward> There are only two hard things in Computer Science: cache invalidation, naming things and off-by-1 errors."
            ];
            processor = new TweetProcessor();
        });

        it("should create two tweetData", function () {
            expect(processor.processData(testData)).have.lengthOf(2);
        });
    });
});
