"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (_ref) {
    var t = _ref.types;

    return {
        visitor: {
            CallExpression: function CallExpression(path, options) {
                var loggers = options.opts.loggers || [{ pattern: "console" }];
                if (isLogger(path, loggers)) {
                    var description = [];
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = path.node.arguments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var expression = _step.value;

                            if (description.length === 0) {
                                var relativePath = void 0;
                                var filePath = this.file.log.filename;
                                if (filePath.charAt(0) !== "/") {
                                    relativePath = filePath;
                                } else {
                                    var cwd = process.cwd();
                                    relativePath = filePath.substring(cwd.length + 1);
                                }

                                var line = expression.loc.start.line;
                                var column = expression.loc.start.column;
                                var commit = commitHash ? ":commit " + commitHash : "";

                                description.push(relativePath + ":" + line + ":" + column + ":" + this.file.code.substring(expression.start, expression.end) + commit);
                            } else {
                                description.push(this.file.code.substring(expression.start, expression.end));
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    path.node.arguments.unshift(t.stringLiteral(description.join(",")));
                }
            }
        }
    };
};

var _ = require("lodash");
var exec = require("child_process").exec;
var commitHash = "";

exec("git rev-parse --short HEAD", function processExecution(error, result) {
    if (error) {
        console.info(error);
        process.exit(0);
    }

    commitHash = process.env.NODE_ENV === "test" ? "000" : result;
});

function isLogger(path, loggers) {
    return _.some(loggers, function (logger) {
        return path.get("callee").matchesPattern(logger.pattern, true);
    });
}