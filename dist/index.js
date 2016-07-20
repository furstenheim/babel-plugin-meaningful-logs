'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (_ref) {
    var t = _ref.types;

    //var t = b.types
    //console.log(b.File())
    return {
        visitor: {
            CallExpression: function CallExpression(path) {
                console.log(path.node.callee.property.name);
                if (path.node.callee.property.name === 'log') {
                    var description = [];
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = path.node.arguments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            //description.push(code.substring(expression.start, expression.end))
                            debugger
                            var expression = _step.value;
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