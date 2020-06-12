# Global-Emitter

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]

A global storage that emits events when an item changes.

## Install

```bash
$ npm i -S @logicamente.info/global-emitter # NPM user
$ yarn add @logicamente.info/global-emitter # YARN user
```

## How to use it

```js
// LISTENER
const { globalEmitter } = require('@logicamente.info/global-emitter');
globalEmitter.on('Item', console.log);

[...]

// PROVIDER
const { setGlobal } = require('@logicamente.info/global-emitter');
setGlobal('Item', 10); // Storages at global and emits to all listeners

// console output: 10
```

## React sample

`App` contains `Form` and `List` components. When a new text is submited at
`Form`, it executes `setGlobal` to perform a emission. `List` sets a listener
at its `componentDidMount` that runs `appendText` on every emission.

No more props (or other complex state managers) to make components communicate!

```js
import React, { Component } from 'react';
import { globalEmitter, setGlobal } from '@logicamente.info/global-emitter';

class App extends Component {
  render() {
    return (
      <div>
        <Form />
        <List />
      </div>
    )
  }
}

class Form extends Component {
  state = {}

  onSubmit(e) {
    e.preventDefault();
    setGlobal('TextForm', this.state.text);
    this.setState({ text: '' });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <input type="text" placeholder="write something..." required
          value={this.state.text}
          onChange={(e) => this.setState({ text: e.target.value })}
        />
        <button type="submit">Send</button>
      </form>
    );
  }
}

class List extends Component {
  state = { list: [] };

  componentDidMount() {
    globalEmitter.on('TextForm', this.appendText.bind(this));
  }

  appendText(text) {
    this.setState({ list: this.state.list.concat([text]) });
  }

  render() {
    return (
      <ul>
        {this.state.list.map((l, i) => <li key={i}>{l}</li>)}
      </ul>
    );
  }
}
```

[build-badge]: https://img.shields.io/travis/logicamenteinfo/global-emitter/master.png?style=flat-square
[build]: https://travis-ci.org/logicamenteinfo/global-emitter

[npm-badge]: https://img.shields.io/npm/v/@logicamente.info/global-emitter.png?style=flat-square
[npm]: https://www.npmjs.org/@logicamente.info/global-emitter