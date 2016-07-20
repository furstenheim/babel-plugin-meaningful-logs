"use strict"
var plugin = require('../dist/index').default
var transformFileSync = require('babel-core').transformFileSync
var path = require('path')
/*
var babylon = require('babylon')
var traverse = require('babel-traverse').default
var generate = require('babel-generator').default
var t = require('babel-types')
var fs = require('fs')
var code = fs.readFileSync('./test/src/test1.js').toString()*/
describe('transform code', function () {
    it('should work', function(done) {
        done()
        var transform = transformFileSync(path.join(__dirname, 'src/test1.js'), {
            presets : ['es2015'],
            'plugins': [plugin]
        }).code
        console.log(transform)
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

