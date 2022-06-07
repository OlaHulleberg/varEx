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