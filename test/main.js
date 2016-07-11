"use strict"
var babylon = require('babylon')
var traverse = require('babel-traverse').default
var generate = require('babel-generator').default
var fs = require('fs')
var code = fs.readFileSync('./test/src/test1.js').toString()
var parsedCode = babylon.parse(code)
//console.log(parsedCode)
//console.log(traverse)

const updateParamNameVisitor = {
    CallExpression(path) {
        console.log(path.node.callee.object, path.node.callee.property, path.node.callee.property.name)
        if (path.node.callee.property.name === 'log') {
            path.node.callee.property.name = "x";
        }
    }
};
/*
const MyVisitor = {
    FunctionDeclaration(path) {
        const param = path.node.params[0];
        const paramName = param.name;
        param.name = "x";

        path.traverse(updateParamNameVisitor, { paramName });
    }
};*/
var ast = traverse(parsedCode, updateParamNameVisitor)
//console.log(traverse(parsedCode, MyVisitor))
var generatedCode = generate(parsedCode, null, code)
fs.writeFileSync('./test/build/test1.js', generatedCode.code)

