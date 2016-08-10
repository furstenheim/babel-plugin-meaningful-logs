"use strict"
var transformFileSync = require('babel-core').transformFileSync
var path = require('path')
var fs = require('fs')
var assert = require('assert')

var plugin = require('../dist/index').default

var tests = [{file: 'test1'},
    {file: 'map'},
    {file: 'nonDefaultLogger'},
    {file: 'nonDefaultLogger2'},
    {file: 'test1', options: {loggers : [{pattern: 'console'}]}},
    {file: 'readLoggerFromOptions', options: {loggers: [{pattern: 'winston'}]}}
]
describe('transform code', function () {
    tests.forEach(function(test){
        it(`No preset ${test.file}`, function(done) {
            var transform = transformFileSync(`test/src/${test.file}.js`, {
                plugins: [[plugin, test.options]],
                babelrc: false // So we don't get babelrc from whole project
            }).code
            var expected = fs.readFileSync(path.join(__dirname, `expected/${test.file}.js`)).toString()
            assert.equal(transform, expected)
            done()
        })
    })
    tests.forEach(function(test){
        it(`Absolute path ${test.file}`, function(done) {
            var transform = transformFileSync(path.join(__dirname, `src/${test.file}.js`), {
                plugins: [[plugin, test.options]],
                babelrc: false // So we don't get babelrc from whole project
            }).code
            var expected = fs.readFileSync(path.join(__dirname, `expected/${test.file}.js`)).toString()
            assert.equal(transform, expected)
            done()
        })
    })

})

