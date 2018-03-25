/**
 * Created by WilsonW on 3/23/2018.
 */

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var TweetProcessor = require('../../../src/components/tweet/tweetProcessor');
var ErrorCode = require('../../../src/enums/errorCode');

describe("TweetProcess test suite", function () {

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
    });

});
