import mkdir from 'mkdirp'
import mkdirp from '../src/index'
import path from 'path'
import rimraf from 'rimraf'
import { test } from 'tap'

let base = path.join('test', 'tmp')

test('mkdirp-promise', (tap) => {
  tap.beforeEach((done) => mkdir(base, done))
  tap.afterEach((done) => rimraf(base, done))

  tap.plan(3)

  tap.test('should successfully create a directory tree', (assert) => {
    let x = Math.floor(Math.random() * Math.pow(16, 4)).toString(16)
    let y = Math.floor(Math.random() * Math.pow(16, 4)).toString(16)
    let z = Math.floor(Math.random() * Math.pow(16, 4)).toString(16)

    let file = path.join(base, path.join.apply(null, [x, y, z]))

    return mkdirp(file).then((made) => assert.equal(made, path.resolve(path.join(base, x))))
  })

  tap.test('should catch thrown errors', (assert) => {
    return mkdirp(true).catch((err) => assert.match(err, /^TypeError/))
  })

  tap.test('should catch errors', (assert) => {
    return mkdirp(path.join('test', 'index.js', 'foo')).catch((err) => assert.equal(err.code, 'ENOTDIR'))
  })
})
