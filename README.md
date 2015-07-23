node-storage-shim
============
node-storage-shim provides a simple shim conforming to the w3c Storage Interface
that can be used as a transient replacement for localStorage or sessionStorage
when running in environments that do not support these, eg: node. 

Note that this does not persist it's data between runs,
and is primarily aimed at use for unit tests.

Example Usage
-----

    var StorageShim = require('node-storage-shim')
    
    storage = new StorageShim()
    
    storage.setItem("foo", "My Value")
    console.log(storage.getItem("foo")
    
Running Unit Tests
------------------
Running the unit tests requires that you have mocha installed globally and accessible on your path.

    npm install -g mocha
    npm test
    
Further Reading
---------------
[w3c Storage Interface](https://w3c.github.io/webstorage/#storage-0)

[MDN Storage Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Storage)