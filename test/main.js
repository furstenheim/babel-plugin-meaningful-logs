"use strict"
var transformFileSync = require('babel-core').transformFileSync
var path = require('path')
var fs = require('fs')
var assert = require('assert')
var diff = require('diff')

var plugin = require('../dist/index').default

var tests = [{file: 'test1'}, {file: 'map'}, {file: 'nonDefaultLogger'}, {file: 'nonDefaultLogger2'}]/*.slice(3,4)*/
describe('transform code', function () {
    tests.forEach(function(test){
        it(`Only one preset ${test.file}`, function(done) {
            var transform = transformFileSync(path.join(__dirname, `src/${test.file}.js`), {
                //'plugins': [plugin],
                presets : ['es2015']
            }).code
            var expected = fs.readFileSync(path.join(__dirname, `expected/${test.file}.js`)).toString()
            console.log(diff.diffChars(transform, expected))
            assert.equal(transform, expected)
            done()
        })
    })
})

