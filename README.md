<h1 align="center">VarEx</h1>

<div align="center">
  Let Variable Expressions brighten up your project ⭐
</div>

<div align="center">
  <h3>
    <a href="https://github.com/OlaHulleberg/varEx">
      Github Repository
    </a>
    <span> | </span>
    <a href="https://www.npmjs.com/package/varex">
      NPM Package
    </a>
    <span> | </span>
    <a href="https://github.com/OlaHulleberg/varEx/blob/main/examples/simple.js">
      Example
    </a>
  </h3> 
</div>

<div align="center">
  <sub>Built with ❤︎ by
  <a href="https://github.com/OlaHulleberg">Ola Hulleberg</a>
</div>

<h2>Table of Contents</h2>

- [Install](#install)
- [Usage](#usage)

<h3>Install</h3>

Install package:
```nodejs
npm i varex
```
<br />

Include in project
```javascript
const varEx = require('varex').varEx;
```
</p>

<h3>Usage</h3>

<p>
Supply string and object to resolve from

```javascript
varEx("Any string you want plus a $[variable] block", objectToResolveFrom);
```

```javascript
// Include varEx
const varEx = require('varex').varEx;

// This is the object we use to resolve variables
const object = {
    var1: "Example",
    var2: "Yet another one",
    var3: "You can even include [] brackets here, even $[variable blocks] doesn't break this",
    varObj: {
        var1: "Supports nesting as well!",
        varArray: [
            "Need arrays? Have at it!"
        ]
    }
};

// Output the result
console.log(
    varEx("This is an $[var1], and here is $[var2]. $[var3]. $[varObj.var1] $[varObj.varArray[0]]", object)
);
```

</p>