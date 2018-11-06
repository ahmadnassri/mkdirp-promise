'use strict'

const mkdir = require('mkdirp')
const mkdirp = require('../lib/index')
const path = require('path')
const rimraf = require('rimraf')
const tap = require('tap')

const base = path.join('test', 'tmp')

tap.beforeEach(done => mkdir(base, done))
tap.afterEach(done => rimraf(base, done))

tap.test('should successfully create a directory tree', assert => {
  assert.plan(1)

  const x = Math.floor(Math.random() * Math.pow(16, 4)).toString(16)
  const y = Math.floor(Math.random() * Math.pow(16, 4)).toString(16)
  const z = Math.floor(Math.random() * Math.pow(16, 4)).toString(16)

  const file = path.join(base, path.join.apply(null, [x, y, z]))

  return mkdirp(file).then(made => assert.equal(made, path.resolve(path.join(base, x))))
})

tap.test('should catch thrown errors', assert => {
  assert.plan(1)

  return mkdirp(true).catch(err => assert.match(err, /^TypeError/))
})

tap.test('should catch errors', assert => {
  assert.plan(1)

  return mkdirp(path.join('test', 'index.js', 'foo')).catch((err) => assert.equal(err.code, 'ENOTDIR'))
})
