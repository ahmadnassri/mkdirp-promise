'use strict'

const mkdir = require('mkdirp')
const mkdirp = require('../lib/index')
const path = require('path')
const rimraf = require('rimraf')
const tap = require('tap')

let base = path.join('test', 'tmp')

tap.test('mkdirp-promise', (t) => {
  t.beforeEach((done) => mkdir(base, done))

  t.afterEach((done) => rimraf(base, done))

  t.plan(3)

  t.test('should successfully create a directory tree', (assert) => {
    var x = Math.floor(Math.random() * Math.pow(16, 4)).toString(16)
    var y = Math.floor(Math.random() * Math.pow(16, 4)).toString(16)
    var z = Math.floor(Math.random() * Math.pow(16, 4)).toString(16)

    var file = path.join(base, path.join.apply(null, [x, y, z]))

    return mkdirp(file).then((made) => assert.equal(made, path.resolve(path.join(base, x))))
  })

  t.test('should catch thrown errors', (assert) => {
    return mkdirp(true).catch((err) => assert.match(err, /^TypeError/))
  })

  t.test('should catch errors', (assert) => {
    return mkdirp(path.join('test', 'index.js', 'foo')).catch((err) => assert.equal(err.code, 'ENOTDIR'))
  })
})
