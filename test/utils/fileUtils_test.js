/**
 * Created by WilsonW on 3/23/2018.
 */
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var should = chai.should();
var utils = require('../../src/utils/fileUtils');

var sandbox, fs;
describe("fileUtils test suite", function () {
    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        fs = {};
        fs.readFileSync = function () {
        };
    });

    afterEach(function () {
        sandbox.restore();
    });

    it("should throw an Error", function () {
        sandbox.stub(fs, 'readFileSync').callsFake(function (path, fs) {
            return "";
        });
        should.throw(function() {
            utils.readFile('er.xt', fs);
        });
    });

    it("should return a array", function () {
        sandbox.stub(fs, 'readFileSync').callsFake(function (path, fs) {
            return "";
        });
        expect(utils.readFile('../data/user.txt', fs)).to.be.a('array');
    });

    it("should handle LF (line feed)", function () {
        sandbox.stub(fs, 'readFileSync').callsFake(function (path, fs) {
            return "Ward follows Alan \n Alan follows Martin\n Ward follows Martin, Alan";
        });
        expect(utils.readFile('../data/user.txt', fs)).to.have.lengthOf(3);
    });

    it("should return 3 records", function () {
        sandbox.stub(fs, 'readFileSync').callsFake(function (path, fs) {
            return "Ward follows Alan \r\n Alan follows Martin\r\nWard follows Martin, Alan";
        });
        expect(utils.readFile('../data/user.txt', fs)).to.have.lengthOf(3);
    });

    it("should still return 3 records", function () {
        sandbox.stub(fs, 'readFileSync').callsFake(function (path, fs) {
            return "Ward follows Alan \r\n Alan follows Martin\r\nWard follows Martin, Alan\r\n";
        });
        expect(utils.readFile('../data/user.txt', fs)).to.have.lengthOf(3);
    });
});
