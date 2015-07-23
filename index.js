var StorageShim = function () {
    this.contents = {}
}

StorageShim.prototype = Object.create({
    get length() {
        return Object.keys(this.contents).length
    },
    key: function (n) {
        var key = Object.keys(this.contents)[n]
        return key || (key === '' ? key : null)
    },
    setItem: function (key, value) {
        this.contents[key] = '' + value
    },
    getItem: function (key) {
        var item = this.contents[key]
        return item || (item === '' ? item : null)
    },
    removeItem: function (key) {
        delete this.contents[key]
    },
    clear: function () {
        this.contents = {}
    }
})

module.exports = StorageShim
