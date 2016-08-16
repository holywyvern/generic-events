

class EventManager {
  
  constructor() {
    this._events = {};
    this._once   = {};
  }
  
  on(name, ...callbacks) {
    this._events[name] = this._events[name] || [];
    this._events[name] = this._events[name].concat(callbacks);
  }
  
  once(name, ...callbacks) {
    this._once[name] = this._once[name] || [];
    this._once[name] = this._once[name].concat(callbacks);
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
  
  offOnce(name, ...callbacks) {
    if (callbacks.length <= 0) {
      this._once[name] = [];
      return;
    }
    this._once[name] = this._once[name] || [];
    for (let i = 0; i < callbacks.length; ++i) {
      let j = this._once[name].indexOf(callbacks[i]);
      while (j !== -1) {
        this._once[name].splice(j, 1);
        j = this._once[name].indexOf(callbacks[i]);
      }
    }
  }

  _callRegularEvents(name, ...args) {
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

  _callOnceEvents(name, ...args) {
    this._once[name] = this._once[name] || [];
    let result = true;
    let length = this._once[name].length;
    for (let i = 0; i < length; ++i) {
      let r = this._once[name][i](...args);
      if ( (typeof r !== 'undefined') && !r ) {
        result = false;
      }
    }
    this._once[name] = [];
    return result;
  }

  fire(name, ...args) {
    return this._callRegularEvents(name, ...args) && this._callOnceEvents(name, ...args);
  }
  
  emit(name, ...args) {
    return this.fire(name, ...args);
  }

  addEventListener(name, ...args) {
    this.on(name, ...args);
  }

  removeEventListener(name, ...args) {
    this.off(name, ...args);
  }

}

export default EventManager;