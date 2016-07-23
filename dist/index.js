"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (_ref) {
    var t = _ref.types;

    return {
        visitor: {
            CallExpression: function CallExpression(path) {
                if (path.get("callee").matchesPattern("console", true)) {
                    var description = [];
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = path.node.arguments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var expression = _step.value;

                            if (description.length === 0) {
                                var filePath = this.file.log.filename.slice(process.cwd().length);
                                var line = expression.loc.start.line;
                                var column = expression.loc.start.column;
                                description.push(filePath + ":" + line + ":" + column + ":" + this.file.code.substring(expression.start, expression.end));
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

                    path.node.arguments.unshift(t.stringLiteral(description.join(',')));
                }
            }
        }
    };
};