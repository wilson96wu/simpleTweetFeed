/**
 * Created by WilsonW on 3/23/2018.
 */
var chai = require('../node_modules/chai/chai');
var expect = chai.expect;
var App = require('../src/app');


describe("App test suite", function () {
    it("should have a public method start", function () {
        var processor = new App();
        expect(processor.start).to.be.a('function');
    });
});
