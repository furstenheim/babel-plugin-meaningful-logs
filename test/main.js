const transformFileSync = require('@babel/core').transformFileSync
const path = require('path')
const fs = require('fs')
const assert = require('assert')

const plugin = require('../dist/index').default

const tests = [
  { file: 'test1' },
  { file: 'map' },
  { file: 'nonDefaultLogger' },
  { file: 'nonDefaultLogger2' },
  { file: 'test1', options: { loggers: [ { pattern: 'console' } ] } },
  { file: 'readLoggerFromOptions', options: { loggers: [ { pattern: 'winston' } ] } }
]
describe('transform code', function () {
  describe('No preset', function () {
    tests.forEach(function (test) {
      ;(test.only ? it.only : it)(`${test.file}`, function (done) {
        const transform = transformFileSync(`test/src/${test.file}.js`, {
          plugins: [ [ plugin, test.options ] ],
          babelrc: false // So we don't get babelrc from whole project
        }).code
        const expected = fs.readFileSync(path.join(__dirname, `expected/${test.file}.js`)).toString()
        assert.strictEqual(transform, expected)
        done()
      })
    })
  })
  describe('Absolute path', function () {
    tests.forEach(function (test) {
      ;(test.only ? it.only : it)(`${test.file}`, function (done) {
        const transform = transformFileSync(path.join(__dirname, `src/${test.file}.js`), {
          plugins: [ [ plugin, test.options ] ],
          babelrc: false // So we don't get babelrc from whole project
        }).code
        const expected = fs.readFileSync(path.join(__dirname, `expected/${test.file}.js`)).toString()
        assert.strictEqual(transform, expected)
        done()
      })
    })
  })
})
