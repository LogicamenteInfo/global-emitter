const events = require('events');

const store = [];
const globalEmitter = new events.EventEmitter();

function getGlobal(item) {
  return store[item];
}

function setGlobal(item, value) {
  store[item] = value;
  globalEmitter.emit(item, value);
}

module.exports = { globalEmitter, getGlobal, setGlobal };