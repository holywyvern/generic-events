'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The event manager is a class than can dispatche messages assigned to it.
 * It works great as a flux dispatcher os as an event listener.
 * This class aims to be used in composition or extension with others.
 */
var EventManager = function () {

  /**
   * Creates a new event manager.
   */
  function EventManager() {
    _classCallCheck(this, EventManager);

    /** This events are events than are called always when this event manager dispatchs it */
    this._events = {};
    /** This events are special, because they are called just once, and after that they are ignored. */
    this._once = {};
  }

  /**
   * Adds one or more callback to listen for an event.
   * @param {string} field The variable name.
   * @param {string} name The name of the callback.
   * @param {function[]} callbacks A list of callbacks to add
   * @private
   */


  _createClass(EventManager, [{
    key: '_onFrom',
    value: function _onFrom(field, name) {
      var events = this[field];
      events[name] = events[name] || [];

      for (var _len = arguments.length, callbacks = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        callbacks[_key - 2] = arguments[_key];
      }

      events[name] = events[name].concat(callbacks);
    }

    /**
     * Adds one or more callback to listen for an event.
     * @param {string} name The name of the callback.
     * @param {function[]} callbacks A list of callbacks to add
     */

  }, {
    key: 'on',
    value: function on(name) {
      for (var _len2 = arguments.length, callbacks = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        callbacks[_key2 - 1] = arguments[_key2];
      }

      this._onFrom.apply(this, ['_events', name].concat(callbacks));
    }

    /**
    * Adds one or more callback to listen for an event.
    * This event will be only called once.
    * @param {string} name The name of the callback.
    * @param {function[]} callbacks A list of callbacks to add
    */

  }, {
    key: 'once',
    value: function once(name) {
      for (var _len3 = arguments.length, callbacks = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        callbacks[_key3 - 1] = arguments[_key3];
      }

      this._onFrom.apply(this, ['_once', name].concat(callbacks));
    }

    /**
     * Removes callbacks from an event.
     * @param { string } field The field name 
     * @param { string } name The event name 
     * @param { function[] } callbacks the callbacks to remove
     * @private
     */

  }, {
    key: '_offFrom',
    value: function _offFrom(field, name) {
      var events = this[field];

      for (var _len4 = arguments.length, callbacks = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        callbacks[_key4 - 2] = arguments[_key4];
      }

      if (callbacks.length <= 0) {
        events[name] = [];
        return;
      }
      events[name] = events[name] || [];
      for (var i = 0; i < callbacks.length; ++i) {
        var j = events[name].indexOf(callbacks[i]);
        while (j !== -1) {
          events[name].splice(j, 1);
          j = events[name].indexOf(callbacks[i]);
        }
      }
    }

    /**
      * Removes callbacks from an event.
      * @param {string} name The name of the callback.
      * @param {function[]} callbacks A list of callbacks to remove 
      * @warn If the list is empty it will remove all events.
      */

  }, {
    key: 'off',
    value: function off(name) {
      for (var _len5 = arguments.length, callbacks = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        callbacks[_key5 - 1] = arguments[_key5];
      }

      this._offFrom.apply(this, ['_events', name].concat(callbacks));
    }

    /**
    * Removes callbacks from an event.
    * It only removes the one called for be called once.
    * @param {string} name The name of the callback.
    * @param {function[]} callbacks A list of callbacks to remove 
    * @warn If the list is empty it will remove all events.
    */

  }, {
    key: 'offOnce',
    value: function offOnce(name) {
      for (var _len6 = arguments.length, callbacks = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        callbacks[_key6 - 1] = arguments[_key6];
      }

      this._offFrom.apply(this, ['_once', name].concat(callbacks));
    }

    /**
     * Call events from a field 
     * @param {string} field The field name 
     * @param {string} name The event name 
     * @param { any[] } ...args The arguments to the callbacks.
     * @private
     */

  }, {
    key: '_callEventsFrom',
    value: function _callEventsFrom(field, name) {
      var events = this[field];
      events[name] = events[name] || [];
      var result = true;
      var length = events[name].length;

      for (var _len7 = arguments.length, args = Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
        args[_key7 - 2] = arguments[_key7];
      }

      for (var i = 0; i < length; ++i) {
        var _events$name;

        var r = (_events$name = events[name])[i].apply(_events$name, args);
        if (typeof r !== 'undefined' && !r) {
          result = false;
        }
      }
      return result;
    }

    /**
     * Call all regular callbacks assigned to an event name
     * @param {string} name The name of the callback.
     * @param { any[]} ...args A list of arguments
     * @returns false if any of the event's callbacks return false, true otherwise.
     * @private
     */

  }, {
    key: '_callRegularEvents',
    value: function _callRegularEvents(name) {
      for (var _len8 = arguments.length, args = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        args[_key8 - 1] = arguments[_key8];
      }

      return this._callEventsFrom.apply(this, ['_events', name].concat(args));
    }

    /**
     * Call all once callbacks assigned to an event name
     * @param {string} name The name of the callback.
     * @param { any[]} ...args A list of arguments
     * @returns false if any of the event's callbacks return false, true otherwise.
     * @private
     */

  }, {
    key: '_callOnceEvents',
    value: function _callOnceEvents(name) {
      for (var _len9 = arguments.length, args = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
        args[_key9 - 1] = arguments[_key9];
      }

      var result = this._callEventsFrom.apply(this, ['_once', name].concat(args));
      this._once[name] = [];
      return result;
    }

    /**
     * Call all callbacks assigned to an event name
     * @param {string} name The name of the callback.
     * @param { any[]} ...args A list of arguments
     * @returns false if any of the event's callbacks return false, true otherwise.
     */

  }, {
    key: 'fire',
    value: function fire(name) {
      for (var _len10 = arguments.length, args = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
        args[_key10 - 1] = arguments[_key10];
      }

      return this._callRegularEvents.apply(this, [name].concat(args)) && this._callOnceEvents.apply(this, [name].concat(args));
    }

    /**
     * Call all callbacks assigned to an event name
     * @param {string} name The name of the callback.
     * @param { any[]} ...args A list of arguments
     * @returns false if any of the event's callbacks return false, true otherwise.
     */

  }, {
    key: 'emit',
    value: function emit(name) {
      for (var _len11 = arguments.length, args = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
        args[_key11 - 1] = arguments[_key11];
      }

      return this.fire.apply(this, [name].concat(args));
    }

    /**
     * Adds one or more callback to listen for an event.
     * @param {string} name The name of the callback.
     * @param {function[]} callbacks A list of callbacks to add
     */

  }, {
    key: 'addEventListener',
    value: function addEventListener(name) {
      for (var _len12 = arguments.length, args = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
        args[_key12 - 1] = arguments[_key12];
      }

      this.on.apply(this, [name].concat(args));
    }

    /**
      * Removes callbacks from an event.
      * @param {string} name The name of the callback.
      * @param {function[]} callbacks A list of callbacks to remove 
      * @warn If the list is empty it will remove all events.
      */

  }, {
    key: 'removeEventListener',
    value: function removeEventListener(name) {
      for (var _len13 = arguments.length, args = Array(_len13 > 1 ? _len13 - 1 : 0), _key13 = 1; _key13 < _len13; _key13++) {
        args[_key13 - 1] = arguments[_key13];
      }

      this.off.apply(this, [name].concat(args));
    }
  }]);

  return EventManager;
}();

exports.default = EventManager;
//# sourceMappingURL=index.js.map
