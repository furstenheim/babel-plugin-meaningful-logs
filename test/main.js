"use strict"
var plugin = require('../dist/index').default
var transformFileSync = require('babel-core').transformFileSync
var path = require('path')
var fs = require('fs')
var assert = require('assert')
describe('transform code', function () {
    it('should work', function(done) {
        var transform = transformFileSync(path.join(__dirname, 'src/test1.js'), {
            //'plugins': [plugin],
            presets : ['es2015']
        }).code
        var expected = fs.readFileSync(path.join(__dirname, 'expected/test1.js')).toString()
        console.log(expected)
        console.log(transform)
        assert.equal(transform, expected)
        done()
    })
})
/*
var parsedCode = babylon.parse(code)
//console.log(parsedCode)
//console.log(traverse)

const updateParamNameVisitor = require('../index')
/!*
const MyVisitor = {
    FunctionDeclaration(path) {
        const param = path.node.params[0];
        const paramName = param.name;
        param.name = "x";

        path.traverse(updateParamNameVisitor, { paramName });
    }
};*!/
var ast = traverse(parsedCode, updateParamNameVisitor)
//console.log(traverse(parsedCode, MyVisitor))
var generatedCode = generate(parsedCode, null, code)
fs.writeFileSync('./test/build/test1.js', generatedCode.code)
*/

