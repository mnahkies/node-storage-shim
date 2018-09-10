if (typeof Proxy !== 'function') {
    throw new Error("node-storage-shim requires the ES2015 Proxy built-in to function.")
}

var RESERVED_KEYS = {
    length: true,
    key: true,
    setItem: true,
    getItem: true,
    removeItem: true,
    clear: true
}

var StorageShimProxyHandler = {
    set: function (target, property, value) {
        target.setItem(property, value)
        return true
    },
    get: function (target, property) {
        if (property in RESERVED_KEYS) {
            return target[property]
        }

        return target.getItem(property)
    }
}

var StorageShim = function () {
    Object.defineProperty(this, 'length', {
        enumerable: false,
        get: function () {
            return Object.keys(this).length
        }
    })

    Object.defineProperty(this, 'key', {
        enumerable: false,
        value: function (n) {
            var key = Object.keys(this)[n]
            return key || (key === '' ? key : null)
        }
    })

    Object.defineProperty(this, 'setItem', {
        enumerable: false,
        value: function (key, value) {
            if (key in RESERVED_KEYS) {
                throw new Error('Cannot assign to reserved key "' + key + '"')
            }

            this[key] = '' + value
        }
    })

    Object.defineProperty(this, 'getItem', {
        enumerable: false,
        value: function (key) {
            if (key in RESERVED_KEYS) {
                throw new Error('Cannot get reserved key "' + key + '"')
            }

            var item = this[key]
            return item || (item === '' ? item : null)
        }
    })

    Object.defineProperty(this, 'removeItem', {
        enumerable: false,
        value: function (key) {
            delete this[key]
        }
    })

    Object.defineProperty(this, 'clear', {
        enumerable: false,
        value: function () {
            for (var key in this) {
                delete this[key]
            }
        }
    })

    return new Proxy(this, StorageShimProxyHandler)
}

module.exports = StorageShim
