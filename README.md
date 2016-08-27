# generic-events
A generic event manager to use on javascript things

[![Build Status](https://travis-ci.org/holywyvern/generic-events.svg?branch=master)](https://travis-ci.org/holywyvern/generic-events)
[![Documentation](http://inch-ci.org/github/holywyvern/generic-events.svg?branch=master)](http://inch-ci.org/github/holywyvern/generic-events)

## example
```js

import EventManager from 'generic-events';

class MyItem {

  constructor() {
    this.events = new EventManager(); // composition instead of extending, you could use both anyway
  }

}

let item = new MyItem();
item.events.on('hello', (name) => console.log(`Hello ${name}`);
item.events.fire('hello', 'Mark'); // Hello Mark

// Events are added
item.events.on('hello', (name) => console.log(`Hello, my friend named ${name}`);

// Events can be appended more than one time
item.events.fire('hello', 'Mark'); // Hello Mark. Hello, my friend named Mark

items.events.off('hello');
item.events.fire('hello', 'Mark'); // Nothing

let fn = (name) => console.log(`Hello ${name}`;

item.events.on('hello', fn);
item.events.on('hello', (name) => console.log(`Hello, my friend named ${name}`);
items.events.off('hello', fn); // can also remove just a single callback
item.events.fire('hello', 'Mark'); // Hello, my friend named Mark

```
