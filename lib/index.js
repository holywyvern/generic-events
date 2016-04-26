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
    key: 'off',
    value: function off(name) {
      for (var _len2 = arguments.length, callbacks = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        callbacks[_key2 - 1] = arguments[_key2];
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
    key: 'fire',
    value: function fire(name) {
      this._events[name] = this._events[name] || [];
      var result = true;
      var length = this._events[name].length;

      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
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
  }]);

  return EventManager;
}();

exports.default = EventManager;
//# sourceMappingURL=index.js.map
