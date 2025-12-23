# node-storage-shim

[![Build Status](https://github.com/mnahkies/node-storage-shim/actions/workflows/ci.yml/badge.svg)](https://github.com/mnahkies/node-storage-shim/actions/workflows/ci.yml?query=branch%3Amaster)
[![npm](https://img.shields.io/npm/v/node-storage-shim.svg)](https://www.npmjs.com/package/node-storage-shim)

node-storage-shim provides a simple shim conforming to the w3c Storage Interface
that can be used as a transient replacement for localStorage or sessionStorage
when running in environments that do not support these, eg: node. 

Note that this does not persist it's data to disk, and is primarily aimed at 
use in unit tests.

## Installation
The package can be installed from npm:

```shell
npm install --save node-storage-shim
```


## Example Usage

```javascript
const StorageShim = require('node-storage-shim')

storage = new StorageShim()

storage.setItem("foo", "My Value")
console.log(storage.getItem("foo")
```
    
## Polyfill localStorage / sessionStorage
If you wish to polyfill the localStorage and sessionStorage globals that are available in 
web browsers, you can do something like this:

```javascript
const StorageShim = require('node-storage-shim')

global.window = global
global.localStorage = new StorageShim()
global.sessionStorage = new StorageShim()
```

## Running Unit Tests
The unit tests use mocha, and are setup to run by the standard npm test command.
This also runs a sanity test of the typescript declaration in the test-typescript-declarations directory

```shell
pnpm install
pnpm test
```

## Limitations
- You cannot use any of the method names as keys, this is a trade-off that is required to support for ... in iteration.

- storage event portion of the interface is not implemented.
    
## Change Log

### 2.0.1 (21-03-2020)
- Improve readme

### 2.0.0 (10-09-2018)
- Updated minimum NodeJS version and started using Proxy to fix limitations with respect to direct property access.
- Added typescript declaration

### 1.0.1 (08/01/2015)
- Initial release

## Further Reading

[w3c Storage Interface](https://w3c.github.io/webstorage/#storage-0)

[MDN Storage Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Storage)
