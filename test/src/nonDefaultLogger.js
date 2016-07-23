"use strict";

var debug = require('debug')('test');

function square(n) {
  return n * n;
}
var b = [1, 2, 3, 4];

debug(b.map(square));