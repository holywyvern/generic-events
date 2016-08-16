'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventManager = function () {
  function EventManager() {
    _classCallCheck(this, EventManager);

    this._events = {};
    this._once = {};
  }

  _createClass(EventManager, [{
    key: 'on',
    value: function on(name) {
      this._events[name] = this._events[name] || [];

      for (var _len = arguments.length, callbacks = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        callbacks[_key - 1] = arguments[_key];
      }

      this._events[name] = this._events[name].concat(callbacks);
    }
  }, {
    key: 'once',
    value: function once(name) {
      this._once[name] = this._once[name] || [];

      for (var _len2 = arguments.length, callbacks = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        callbacks[_key2 - 1] = arguments[_key2];
      }

      this._once[name] = this._once[name].concat(callbacks);
    }
  }, {
    key: 'off',
    value: function off(name) {
      for (var _len3 = arguments.length, callbacks = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        callbacks[_key3 - 1] = arguments[_key3];
      }

      if (callbacks.length <= 0) {
        this._events[name] = [];
        return;
      }
      this._events[name] = this._events[name] || [];
      for (var i = 0; i < callbacks.length; ++i) {
        var j = this._events[name].indexOf(callbacks[i]);
        while (j !== -1) {
          this._events[name].splice(j, 1);
          j = this._events[name].indexOf(callbacks[i]);
        }
      }
    }
  }, {
    key: 'offOnce',
    value: function offOnce(name) {
      for (var _len4 = arguments.length, callbacks = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        callbacks[_key4 - 1] = arguments[_key4];
      }

      if (callbacks.length <= 0) {
        this._once[name] = [];
        return;
      }
      this._once[name] = this._once[name] || [];
      for (var i = 0; i < callbacks.length; ++i) {
        var j = this._once[name].indexOf(callbacks[i]);
        while (j !== -1) {
          this._once[name].splice(j, 1);
          j = this._once[name].indexOf(callbacks[i]);
        }
      }
    }
  }, {
    key: '_callRegularEvents',
    value: function _callRegularEvents(name) {
      this._events[name] = this._events[name] || [];
      var result = true;
      var length = this._events[name].length;

      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      for (var i = 0; i < length; ++i) {
        var _events$name;

        var r = (_events$name = this._events[name])[i].apply(_events$name, args);
        if (typeof r !== 'undefined' && !r) {
          result = false;
        }
      }
      return result;
    }
  }, {
    key: '_callOnceEvents',
    value: function _callOnceEvents(name) {
      this._once[name] = this._once[name] || [];
      var result = true;
      var length = this._once[name].length;

      for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        args[_key6 - 1] = arguments[_key6];
      }

      for (var i = 0; i < length; ++i) {
        var _once$name;

        var r = (_once$name = this._once[name])[i].apply(_once$name, args);
        if (typeof r !== 'undefined' && !r) {
          result = false;
        }
      }
      this._once[name] = [];
      return result;
    }
  }, {
    key: 'fire',
    value: function fire(name) {
      for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        args[_key7 - 1] = arguments[_key7];
      }

      return this._callRegularEvents.apply(this, [name].concat(args)) && this._callOnceEvents.apply(this, [name].concat(args));
    }
  }, {
    key: 'emit',
    value: function emit(name) {
      for (var _len8 = arguments.length, args = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        args[_key8 - 1] = arguments[_key8];
      }

      return this.fire.apply(this, [name].concat(args));
    }
  }, {
    key: 'addEventListener',
    value: function addEventListener(name) {
      for (var _len9 = arguments.length, args = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
        args[_key9 - 1] = arguments[_key9];
      }

      this.on.apply(this, [name].concat(args));
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener(name) {
      for (var _len10 = arguments.length, args = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
        args[_key10 - 1] = arguments[_key10];
      }

      this.off.apply(this, [name].concat(args));
    }
  }]);

  return EventManager;
}();

exports.default = EventManager;
//# sourceMappingURL=index.js.map
