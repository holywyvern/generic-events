

class EventManager {
  
  constructor() {
    this._events = {};
  }
  
  on(name, ...callbacks) {
    this._events[name] = this._events[name] || [];
    this._events[name] = this._events[name].concat(callbacks);
  }
  
  off(name, ...callbacks) {
    if (callbacks.length <= 0) {
      this._events[name] = [];
      return;
    }
    this._events[name] = this._events[name] || [];
    for (let i = 0; i < callbacks.length; ++i) {
      let j = this._events[name].indexOf(callbacks[i]);
      while (j !== -1) {
        this._events[name].splice(j, 1);
        j = this._events[name].indexOf(callbacks[i]);
      }
    }
  }
  
  fire(name, ...args) {
    this._events[name] = this._events[name] || [];
    let result = true;
    let length = this._events[name].length;
    for (let i = 0; i < length; ++i) {
      let r = this._events[name][i](...args);
      if ( (typeof r !== 'undefined') && !r ) {
        result = false;
      }
    }
    return result;
  }
  
}

export default EventManager;