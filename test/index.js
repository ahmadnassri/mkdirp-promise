/* global beforeEach, afterEach, describe, it */

'use strict'

var mkdirp = require('..')
var path = require('path')
var rimraf = require('rimraf')
var mkdir = require('mkdirp')

require('should')

var base = path.join('test', 'tmp')

beforeEach(function (done) {
  mkdir(base, done)
})

afterEach(function (done) {
  rimraf(base, done)
})

describe('node module', function () {
  it('should successfully create a directory tree', function (done) {
    var x = Math.floor(Math.random() * Math.pow(16, 4)).toString(16)
    var y = Math.floor(Math.random() * Math.pow(16, 4)).toString(16)
    var z = Math.floor(Math.random() * Math.pow(16, 4)).toString(16)

    var file = path.join(base, path.join.apply(null, [x, y, z]))

    mkdirp(file).then(function (made) {
      made.should.equal(path.resolve(path.join(base, x)))

      done()
    })
  })

  it('should catch thrown errors', function (done) {
    mkdirp(true).catch(function (err) {
      err.should.match(/^TypeError/)
      done()
    })
  })

  it('should catch errors', function (done) {
    mkdirp(path.join('test', 'index.js', 'foo')).catch(function (err) {
      err.code.should.equal('ENOTDIR')
      done()
    })
  })
})
