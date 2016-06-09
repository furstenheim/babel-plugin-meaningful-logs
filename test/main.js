"use strict"
var babylon = require('babylon')
var fs = require('fs')
var code = fs.readFileSync('./src/test1.js').toString()
var parsedCode = babylon.parse(code)
console.log(parsedCode)
fs.writeFileSync('./build/test1.js', JSON.stringify(parsedCode))

