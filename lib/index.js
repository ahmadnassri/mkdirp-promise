'use strict'

var Promise = require('pinkie-promise')
var mkdirp = require('mkdirp')

module.exports = function (dir, opts) {
  return new Promise(function (resolve, reject) {
    mkdirp(dir, opts, function (err, made) {
      return err === null ? resolve(made) : reject(err)
    })
  })
  .catch(function (err) {
    throw err
  })
}
