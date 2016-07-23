//lodash
export default function ({types: t}) {
    return {
        visitor  : {
            CallExpression(path) {
                if (path.get("callee").matchesPattern("console", true)) {
                    var description = []
                    for (let expression of path.node.arguments) {
                        description.push(this.file.code.substring(expression.start, expression.end))
                    }
                    path.node.arguments.unshift(t.stringLiteral(description.join(',')))
                }
            }
        }
    }

}
