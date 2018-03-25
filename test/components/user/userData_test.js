/**
 * Created by WilsonW on 3/23/2018.
 */
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var UserData = require('../../../src/components/user/userData');
var ErrorCode = require('../../../src/enums/errorCode');


describe("UserData test suite", function () {
    it("should throw an error if no name is provided", function () {
        should.throw(function () {
                new UserData();
            },
            ErrorCode['10008']);
    });

    it("should throw an error if a number is passed as name", function () {
        should.throw(function () {
                new UserData(1);
            },
            ErrorCode['10008']);
    });

    it("should have a followers and followings array", function () {
        var userData = new UserData('Tom');
        expect(userData.followers).to.be.a('array');
        expect(userData.followings).to.be.a('array');
    });

    it("should add same follower once", function () {
        var userData = new UserData('Tom');
        userData.addFollower('Jerry');
        userData.addFollower('Jerry');
        expect(userData.followers[0]).to.equal('Jerry');
        expect(userData.followers).to.have.lengthOf(1);
    });

    it("should add same leader once", function () {
        var userData = new UserData('Jerry');
        userData.addLeader('Tom');
        userData.addLeader('Tom');
        expect(userData.followings[0]).to.equal('Tom');
        expect(userData.followings).to.have.lengthOf(1);
    });
});