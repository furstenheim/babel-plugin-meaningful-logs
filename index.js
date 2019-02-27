const _ = require("lodash")
const exec = require("child_process").exec
let commitHash = "";

exec("git rev-parse --short HEAD", function processExecution(error, result) {
    if (error) {
        console.info(error);
        process.exit(0);
    }

    commitHash = process.env.NODE_ENV === "test" ? "000" : result;
});

export default function ({types: t}) {
    return {
        visitor  : {
            CallExpression(path, options) {
                const loggers = options.opts.loggers || [{pattern: "console"}]
                if (isLogger(path, loggers)) {
                    const description = []
                    for (const expression of path.node.arguments) {
                        if (description.length === 0) {
                            let relativePath
                            const filePath = this.file.log.filename
                            if (filePath.charAt(0) !== "/") {
                                relativePath = filePath
                            } else {
                                let cwd = process.cwd()
                                relativePath = filePath.substring(cwd.length + 1)
                            }

                            const line = expression.loc.start.line
                            const column = expression.loc.start.column
                            const commit = commitHash ? `:commit ${commitHash}` : "";

                            description.push(`${relativePath}:${line}:${column}:${this.file.code.substring(expression.start, expression.end)}${commit}`)
                        } else {
                            description.push(this.file.code.substring(expression.start, expression.end))
                        }

                    }
                    path.node.arguments.unshift(t.stringLiteral(description.join(",")))
                }
            }
        }
    }

}

function isLogger(path, loggers) {
    return _.some(loggers, function(logger) {
        return path.get("callee").matchesPattern(logger.pattern, true)
    })
}
