"use strict"
var transformFileSync = require('babel-core').transformFileSync
var path = require('path')
var fs = require('fs')
var assert = require('assert')
var diff = require('diff')

var plugin = require('../dist/index').default

var tests = [{file: 'test1'},
    {file: 'map'},
    {file: 'nonDefaultLogger'},
    {file: 'nonDefaultLogger2'},
    {file: 'test1', options: {loggers : [{logger: 'console'}]}},
    {file: 'readLoggerFromOptions', options: {loggers: [{logger: 'winston'}]}}
]
describe('transform code', function () {
    tests.forEach(function(test){
        it(`No preset ${test.file}`, function(done) {
            var transform = transformFileSync(path.join(__dirname, `src/${test.file}.js`), {
                plugins: [[plugin, test.options]]
                //presets : ['es2015']
            }).code
            var expected = fs.readFileSync(path.join(__dirname, `expected/${test.file}.js`)).toString()
            console.log(diff.diffChars(transform, expected))
            assert.equal(transform, expected)
            done()
        })
    })
})

