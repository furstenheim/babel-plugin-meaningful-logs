//lodash
export default function ({types: t}) {
    //var t = b.types
    //console.log(b.File())
    return {
        visitor  : {
            CallExpression(path) {
                console.log(path.node.callee.property.name)
                if (path.node.callee.property.name === 'log') {
                    var description = []
                    for (let expression of path.node.arguments) {
                        //description.push(code.substring(expression.start, expression.end))
                    }
                    path.node.arguments.unshift(t.stringLiteral(description.join(',')))
                }
            }
        }
    }

}
