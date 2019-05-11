Babel Plugin Meaningful Logs
======

A babel plugin that enhances your logs by adding the file and the object logging.

### Example
```javascript
"use strict"
console.log(b.length)
```

becomes

```javascript
"use strict"
console.log("pathToFile:2:8:b.length", b.length)
```

By default it modifies all console commands: console.error, console.log... But it can be customized. To modify all winstons logs the .babelrc file would be:

```
{
  plugins: [
    ['meaningful-logs',
    {loggers: [{pattern: 'winston'}]}
    ]
  ]
}
```


### Running the tests

    yarn build
    yarn test
