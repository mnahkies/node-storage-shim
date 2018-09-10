import Storage = require('node-storage-shim')

const x = new Storage();

x.setItem("foo", "bar")
x["foo"] = "bar"

if (x.length == 1) {
    console.log(x["foo"])
}
