//lodash
export default function (b) {
    var t = b.types
    //var t = b.types
    //console.log(b.File())
    return {
        visitor  : {
            CallExpression(path) {
                var c = b
                console.log(path.node.callee.property.name)
                if (path.node.callee.property.name === 'log') {
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
