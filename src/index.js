
/**
 * The event manager is a class than can dispatche messages assigned to it.
 * It works great as a flux dispatcher os as an event listener.
 * This class aims to be used in composition or extension with others.
 */
class EventManager {
  
  /**
   * Creates a new event manager.
   */
  constructor() {
    /** This events are events than are called always when this event manager dispatchs it */
    this._events = {};
    /** This events are special, because they are called just once, and after that they are ignored. */
    this._once   = {};
  }
  
  /**
   * Adds one or more callback to listen for an event.
   * @param {string} field The variable name.
   * @param {string} name The name of the callback.
   * @param {function[]} callbacks A list of callbacks to add
   * @private
   */
  _onFrom(field, name, ...callbacks) {
    let events = this[field];
    events[name] = events[name] || [];
    events[name] = events[name].concat(callbacks);
  }

  /**
   * Adds one or more callback to listen for an event.
   * @param {string} name The name of the callback.
   * @param {function[]} callbacks A list of callbacks to add
   */
  on(name, ...callbacks) {
    this._onFrom('_events', name, ...callbacks);
  }
  
   /**
   * Adds one or more callback to listen for an event.
   * This event will be only called once.
   * @param {string} name The name of the callback.
   * @param {function[]} callbacks A list of callbacks to add
   */
  once(name, ...callbacks) {
    this._onFrom('_once', name, ...callbacks);
  }

  /**
   * Removes callbacks from an event.
   * @param { string } field The field name 
   * @param { string } name The event name 
   * @param { function[] } callbacks the callbacks to remove
   * @private
   */
  _offFrom(field, name, ...callbacks) {
    let events = this[field];
    if (callbacks.length <= 0) {
      events[name] = [];
      return;
    }
    events[name] = events[name] || [];
    for (let i = 0; i < callbacks.length; ++i) {
      let j = events[name].indexOf(callbacks[i]);
      while (j !== -1) {
        events[name].splice(j, 1);
        j = events.indexOf(callbacks[i]);
      }
    }
  }

 /**
   * Removes callbacks from an event.
   * @param {string} name The name of the callback.
   * @param {function[]} callbacks A list of callbacks to remove 
   * @warn If the list is empty it will remove all events.
   */
  off(name, ...callbacks) {
    this._offFrom('_events', name, ...callbacks);
  }
  
   /**
   * Removes callbacks from an event.
   * It only removes the one called for be called once.
   * @param {string} name The name of the callback.
   * @param {function[]} callbacks A list of callbacks to remove 
   * @warn If the list is empty it will remove all events.
   */
  offOnce(name, ...callbacks) {
    this._offFrom('_once', name, ...callbacks);
  }

  /**
   * Call events from a field 
   * @param {string} field The field name 
   * @param {string} name The event name 
   * @param { any[] } ...args The arguments to the callbacks.
   * @private
   */
  _callEventsFrom(field, name, ...args) {
    let events = this[field];
    events[name] = events[name] || [];
    let result = true;
    let length = events[name].length;
    for (let i = 0; i < length; ++i) {
      let r = events[name][i](...args);
      if ( (typeof r !== 'undefined') && !r ) {
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
  _callRegularEvents(name, ...args) {
    return this._callEventsFrom('_events', name, ...args);
  }

  /**
   * Call all once callbacks assigned to an event name
   * @param {string} name The name of the callback.
   * @param { any[]} ...args A list of arguments
   * @returns false if any of the event's callbacks return false, true otherwise.
   * @private
   */
  _callOnceEvents(name, ...args) {
    let result = this._callEventsFrom('_once', name, ...args);
    this._once[name] = [];
    return result;
  }

  /**
   * Call all callbacks assigned to an event name
   * @param {string} name The name of the callback.
   * @param { any[]} ...args A list of arguments
   * @returns false if any of the event's callbacks return false, true otherwise.
   */
  fire(name, ...args) {
    return this._callRegularEvents(name, ...args) && this._callOnceEvents(name, ...args);
  }
  
  /**
   * Call all callbacks assigned to an event name
   * @param {string} name The name of the callback.
   * @param { any[]} ...args A list of arguments
   * @returns false if any of the event's callbacks return false, true otherwise.
   */  
  emit(name, ...args) {
    return this.fire(name, ...args);
  }

  /**
   * Adds one or more callback to listen for an event.
   * @param {string} name The name of the callback.
   * @param {function[]} callbacks A list of callbacks to add
   */
  addEventListener(name, ...args) {
    this.on(name, ...args);
  }

 /**
   * Removes callbacks from an event.
   * @param {string} name The name of the callback.
   * @param {function[]} callbacks A list of callbacks to remove 
   * @warn If the list is empty it will remove all events.
   */
  removeEventListener(name, ...args) {
    this.off(name, ...args);
  }

}

export default EventManager;