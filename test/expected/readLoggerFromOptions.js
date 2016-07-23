var winston = require("winston");

function square(n) {
  return n * n;
}
var b = [1, 2, 3, 4];

winston.log("/test/src/readLoggerFromOptions.js:8:12:b.map(square)", b.map(square));