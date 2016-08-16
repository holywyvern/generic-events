"use strict";

let chai = require('chai');

let EventManager = require('../lib/index').default;

const expect = chai.expect;

describe("Test event manager", function () {

  describe("Test regular events work", function () {
    it("Fires an event two times to check", function () {

      let events = new EventManager();
      events.on('test', function () { throw "Test Ok"; });
      expect(events.fire.bind(events, 'test')).to.throw("Test Ok");
      expect(events.emit.bind(events, 'test')).to.throw("Test Ok");
    });
  });

  describe("Test once events work", function () {
    it("Checks than an once event do not fire twice", function () {
      let events = new EventManager();
      let result = 0;
      events.once('test', function () { result++; });
      events.emit('test');
      expect(result).to.equal(1);
      events.emit('test');
      expect(result).to.equal(1);
    });
  });

});