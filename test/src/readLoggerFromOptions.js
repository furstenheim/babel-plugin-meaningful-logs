var winston = require("winston");

function square(n) {
  return n * n;
}
var b = [1, 2, 3, 4];

winston.log(b.map(square));