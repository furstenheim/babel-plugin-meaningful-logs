// One could transpile index using babel and a .babelrc file, but then this file is used for the tests.
var transformFileSync = require('babel-core').transformFileSync
var fs = require('fs')
var path = require('path')

var transformedCode = transformFileSync(path.join(__dirname, 'index.js'), {
  presets: ['es2015']
}).code
fs.writeFileSync('dist/index.js', transformedCode)