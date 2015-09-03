var assert = require('assert')

var StorageShim = require('./index')

describe('StorageShim', function () {

    var instance

    beforeEach(function () {
        instance = new StorageShim()
    })

    it('.length returns the number of keys', function () {
        assert.strictEqual(instance.length, 0)
        instance.setItem('1', 1)
        assert.strictEqual(instance.length, 1)
        instance.setItem('2', 2)
        assert.strictEqual(instance.length, 2)
    })

    it('#key(n) returns the nth key', function () {
        instance.setItem('1', 1)
        assert.strictEqual(instance.key(0), '1')
        assert.strictEqual(instance.key(1), null)
    })

    it('#setItem(key, value) sets an item that can be retrieved by #getItem(key)', function () {
        instance.setItem('1', 'foobar')
        assert.strictEqual(instance.getItem('1'), 'foobar')
    })

    it('#setItem(key, value) sets an item that can be retrieved by property access', function () {
        instance.setItem('foo', 'bar')
        assert.strictEqual(instance.foo, 'bar')
    })

    it('#getItem(key) returns items set using property access', function () {
        instance.foo = 'bar'
        assert.strictEqual(instance.getItem('foo'), 'bar')
    })

    it('#getItem(key) returns null if key does not exist', function () {
        assert.strictEqual(instance.getItem('1'), null)
    })

    it('#clear() deletes all items', function () {
        instance.setItem('1', 'foobar')
        instance.clear()
        assert.strictEqual(instance.getItem('1'), null)
    })

    it('#removeItem(key) deletes the item for that key', function () {
        instance.setItem('1', 'foobar')
        instance.removeItem('1')
        assert.strictEqual(instance.getItem('1'), null)
    })

    it('empty key works', function () {
        instance.setItem('', 'foobar')
        assert.strictEqual(instance.getItem(''), 'foobar')
        assert.strictEqual(instance.key(0), '')
    })

    it('for in iteration works', function () {
        instance.setItem('foo', 'bar')

        for (var key in instance) {
            assert.strictEqual(key, 'foo')
        }
    })

    it('Object.keys works', function () {
        instance.setItem('foo', 'bar')
        assert.strictEqual(Object.keys(instance)[0], 'foo')
    })
})
