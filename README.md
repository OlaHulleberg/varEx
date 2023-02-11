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

- [Goal](#goal)
- [Install](#install)
- [Why, or when to use this?](#why)
- [Usage](#usage)

<h3>Goal</h3>
<p align="center"><strong>VarEx aims to solve the problem of resolving variables you don't yet have access to (but know you will), when writing the template.</strong></p>

<h3>Install</h3>

Install package:
```nodejs
npm i varex
```
<br />

Include in project
```javascript
const { varEx } = require('varex');
```
</p>

<h3 id="why">Why use this?</h3>

<p>
Let me start of by saying that if you simply want to resolve a variable or function into a string, you should just use Javascript's built-in template literals ${}

**VarEx** only aims to solve the problem of resolving variables you don't yet have access to (but know you will), when writing the template.
</p>
<p>
This function was originally created because I ran into a problem with table formatting.
I didn't want to create an entire function just to format data at runtime into a table, and then have to repeat this process for another.
I wanted to be able to create a simple table component where you could specify beforehand how your data was supposed to be formatted, and that it would work with any input data whatsoever.

This is the table component that spawned the need for this function:
```javascript
<List
  data={{
    headers: [
      {
        title: "Coffee Type",
        data: " ($[bean_type.product_name.grams_of_coffee] g)",
      },
      { 
        title: "Grinding",
        data: "$[grinding_setting]"
      },
      { 
        title: "Water",
        data: "$[water_in_liter] l"
      },
    ],
    items: this.state.items,
  }}
  filters={this.state.filters}
/>
```

The part where **VarEx** came in handy was in the data part, where we try to resolve the data with a certain format. Sure this doesn't need a function like **VarEx** to begin with, but having to constantly repeat simple but slightly different table formatting functions each time, eventually taints the codebase. I wanted a reusable function to format each different table with an already defined format config.
```javascript
data: " ($[grams_of_coffee] g)"
```

Using **VarEx** it really was as simple as creating a table component that runs **VarEx()** on every item displayed. No need to create a custom switch case for displaying water in liters, coffee beans in grams and so on.
</p>

<h3>Usage</h3>

<p>
Supply string and object to resolve from

```javascript
varEx("Any string you want plus a $[variable] block", objectToResolveFrom);
```

```javascript
// Include varEx
const { varEx } = require('varex');

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