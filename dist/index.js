"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _ = require('lodash');

function _default(_ref) {
  let t = _ref.types;
  return {
    visitor: {
      CallExpression(path, options) {
        var loggers = options.opts.loggers || [{
          pattern: 'console'
        }];

        if (isLogger(path, loggers)) {
          var description = [];

          for (let expression of path.node.arguments) {
            if (description.length === 0) {
              let relativePath;
              let filePath = this.file.opts.filename;

              if (filePath.charAt(0) !== '/') {
                relativePath = filePath;
              } else {
                let cwd = process.cwd();
                relativePath = filePath.substring(cwd.length + 1);
              }

              let line = expression.loc.start.line;
              let column = expression.loc.start.column;
              description.push("".concat(relativePath, ":").concat(line, ":").concat(column, ":").concat(this.file.code.substring(expression.start, expression.end)));
            } else {
              description.push(this.file.code.substring(expression.start, expression.end));
            }
          }

          path.node.arguments.unshift(t.stringLiteral(description.join(',')));
        }
      }

    }
  };
}

function isLogger(path, loggers) {
  return _.some(loggers, function (logger) {
    return path.get('callee').matchesPattern(logger.pattern, true);
  });
}