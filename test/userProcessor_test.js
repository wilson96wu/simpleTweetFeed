/**
 * Created by WilsonW on 3/23/2018.
 */

var chai = require('../node_modules/chai/chai');
var expect = chai.expect;
var should = require('chai').should();
var ErrorCode = require('../src/errorCode');
var UserProcessor = require('../src/userProcessor');

describe("UserProcessor test suite", function () {

    it("should have a public method processUserData", function () {
        var processor = new UserProcessor();
        expect(processor.processData).to.be.a('function');
    });

    describe('Error handling', function () {

        var processor = new UserProcessor();

        it("should through an Error when pass string instead of Array", function () {
            var usersData = "Ward follows Alan";
            should.throw(function () {
                    processor.processData(usersData);
                },
                ErrorCode['10007']
            );
        });

        it("should through an Error if no key word 'follows' in the record", function () {
            var usersData = [" Alan"];
            should.throw(function () {
                processor.processData(usersData);
            });
        });

        it("should through an Error if no name in the record", function () {
            var usersData = [" follows Alan"];
            should.throw(function () {
                processor.processData(usersData);
            });
        });

        it("should through an Error if not valid name in the record", function () {
            var usersData = ["1 follows "];
            should.throw(function () {
                processor.processData(usersData);
            });
        });

        it("should through an Error if no following section in the record", function () {
            var usersData = ["a follows "];
            should.throw(function () {
                processor.processData(usersData);
            });
        });

        it("should through an Error if not valid following in the record", function () {
            var usersData = ["a follows 1 "];
            should.throw(function () {
                processor.processData(usersData);
            });
        });
    });

    describe("handle a single record", function () {

        var usersData, processor;
        beforeEach(function () {
            usersData = ["Ward follows Alan"];
            processor = new UserProcessor();
        });

        it("should return a object", function () {
            expect(processor.processData(usersData)).to.be.a('object');
        });

        it("should create two users", function () {
            var usersMap = processor.processData(usersData);
            expect(Object.keys(usersMap)).have.lengthOf(2);
        });

        it("should have correct follower", function () {
            var usersMap = processor.processData(usersData);
            expect(usersMap['Alan'].followers[0]).to.equal('Ward');
        });

        it("should have correct following", function () {
            var usersMap = processor.processData(usersData);
            expect(usersMap['Ward'].followings[0]).to.equal('Alan');
        });
    });


    describe("handle two records", function () {
        var usersData, processor;
        beforeEach(function () {
            usersData = ["Ward follows Alan", "Alan follows Martin"];
            processor = new UserProcessor();
        });

        it("should create three users", function () {
            var usersMap = processor.processData(usersData);
            expect(Object.keys(usersMap)).have.lengthOf(3);
        });

        it("should have correct following", function () {
            var usersMap = processor.processData(usersData);
            expect(usersMap['Alan'].followings[0]).to.equal('Martin');
        });
    });

    describe("handle three records with comma", function () {
        var usersData, processor;
        beforeEach(function () {
            usersData = ["Ward follows Alan", "Alan follows Martin", "Ward follows Martin, Alan"];
            processor = new UserProcessor();
        });

        it("should create three users", function () {
            var usersMap = processor.processData(usersData);
            expect(Object.keys(usersMap)).have.lengthOf(3);
        });

        it("should have correct followings", function () {
            var usersMap = processor.processData(usersData);
            expect(usersMap['Alan'].followings[0]).to.equal('Martin');
            expect(usersMap['Ward'].followings[0]).to.equal('Alan');
            expect(usersMap['Ward'].followings[1]).to.equal('Martin');
        });

        it("should have correct followers", function () {
            var usersMap = processor.processData(usersData);
            expect(usersMap['Alan'].followers[0]).to.equal('Ward');
            expect(usersMap['Martin'].followers[0]).to.equal('Alan');
            expect(usersMap['Martin'].followers[1]).to.equal('Ward');
        });
    });


});
