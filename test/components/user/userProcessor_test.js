/**
 * Created by WilsonW on 3/23/2018.
 */

var chai = require('../../../node_modules/chai/chai');
var expect = chai.expect;
var should = require('chai').should();
var ErrorCode = require('../../../src/enums/errorCode');
var UserProcessor = require('../../../src/components/user/userProcessor');

describe("UserProcessor test suite", function () {

    it("should have a public method processUserData", function () {
        var processor = new UserProcessor();
        expect(processor.processData).to.be.a('function');
    });

    describe('Error handling', function () {

        var processor = new UserProcessor();

        it("should through an Error when pass string instead of Array", function () {
            var testData = "Ward follows Alan";
            should.throw(function () {
                    processor.processData(testData);
                },
                ErrorCode['10007']
            );
        });

        it("should through an Error if no key word 'follows' in the record", function () {
            var testData = [" Alan"];
            should.throw(function () {
                    processor.processData(testData);
                },
                ErrorCode['10001']
            );
        });

        it("should through an Error if no name in the record", function () {
            var testData = [" follows Alan"];
            should.throw(function () {
                    processor.processData(testData);
                },
                ErrorCode['10003']
            );
        });

        it("should through an Error if not valid name in the record", function () {
            var testData = ["123 follows "];
            should.throw(function () {
                    processor.processData(testData);
                },
                ErrorCode['10004']
            );
        });

        it("should through an Error if no following section in the record", function () {
            var testData = ["a follows "];
            should.throw(function () {
                    processor.processData(testData);
                },
                ErrorCode['10005']);
        });

        it("should through an Error if not valid following in the record", function () {
            var testData = ["a follows 1 "];
            should.throw(function () {
                    processor.processData(testData);
                },
                ErrorCode['10006']
            );
        });
    });

    describe("handle a single record", function () {

        var testData, processor;
        beforeEach(function () {
            testData = ["Ward follows Alan"];
            processor = new UserProcessor();
        });

        it("should return a object", function () {
            expect(processor.processData(testData)).to.be.a('object');
        });

        it("should create two users", function () {
            var usersMap = processor.processData(testData);
            expect(Object.keys(usersMap)).have.lengthOf(2);
        });

        it("should have correct follower", function () {
            var usersMap = processor.processData(testData);
            expect(usersMap['Alan'].followers[0]).to.equal('Ward');
        });

        it("should have correct following", function () {
            var usersMap = processor.processData(testData);
            expect(usersMap['Ward'].followings[0]).to.equal('Alan');
        });
    });


    describe("handle two records", function () {
        var testData, processor;
        beforeEach(function () {
            testData = ["Ward follows Alan", "Alan follows Martin"];
            processor = new UserProcessor();
        });

        it("should create three users", function () {
            var usersMap = processor.processData(testData);
            expect(Object.keys(usersMap)).have.lengthOf(3);
        });

        it("should have correct following", function () {
            var usersMap = processor.processData(testData);
            expect(usersMap['Alan'].followings[0]).to.equal('Martin');
        });
    });

    describe("handle three records with comma", function () {
        var testData, processor;
        beforeEach(function () {
            testData = ["Ward follows Alan", "Alan follows Martin", "Ward follows Martin, Alan"];
            processor = new UserProcessor();
        });

        it("should create three users", function () {
            var usersMap = processor.processData(testData);
            expect(Object.keys(usersMap)).have.lengthOf(3);
        });

        it("should have correct leaders", function () {
            var usersMap = processor.processData(testData);
            expect(usersMap['Alan'].followings[0]).to.equal('Martin');
            expect(usersMap['Ward'].followings[0]).to.equal('Alan');
            expect(usersMap['Ward'].followings[1]).to.equal('Martin');
        });

        it("should have correct followers", function () {
            var usersMap = processor.processData(testData);
            expect(usersMap['Alan'].followers[0]).to.equal('Ward');
            expect(usersMap['Martin'].followers[0]).to.equal('Alan');
            expect(usersMap['Martin'].followers[1]).to.equal('Ward');
        });
    });


});
