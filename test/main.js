"use strict"
var babylon = require('babylon')
var traverse = require('babel-traverse').default
var generate = require('babel-generator').default
var fs = require('fs')
var code = fs.readFileSync('./test/src/test1.js').toString()
var parsedCode = babylon.parse(code)
//console.log(parsedCode)
console.log(traverse)
let paramName;

const MyVisitor = {
    FunctionDeclaration(path) {
        const param = path.node.params[0];
        paramName = param.name;
        param.name = "x";
    },

    Identifier(path) {
        if (path.node.name === paramName) {
            path.node.name = "x";
        }
    }
};
var ast = traverse(parsedCode, MyVisitor)
//console.log(traverse(parsedCode, MyVisitor))
var generatedCode = generate(parsedCode, null, code)
fs.writeFileSync('./test/build/test1.js', generatedCode.code)

