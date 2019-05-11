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

It also logs the full path by default. This can be slightly annoying for really nested files. 
In order to configure this use the the `maxDepth` property.
Which will limit the number of folders added to the path. For example:

```
{
  plugins: [
    ['meaningful-logs',
    {maxDepth: 2}
    ]
  ]
}
```

Will print `really-nested/fullPath.js` Instead of `test/src/nested/really-nested/fullPath.js` 



### Running the tests

    yarn build
    yarn test
