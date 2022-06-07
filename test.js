const varEx = require('./index').varEx;
const assert = require('assert');

const testObj = {
    name: "varEx",
    info: {
        language: "Javascript",
    },
    contributors: [
        "Ola"
    ]
}

describe('varEx', function () {
    // Variable test
    describe('#variable', function() {
        it('should be able to parse object', function() {
            assert.equal("Hello, this package is called varEx.", varEx("Hello, this package is called $[name].", testObj));
        });
    });

    // Variable inside object test
    describe('#object', function() {
        it('should be able to parse subvariable', function() {
            assert.equal("This package is written in Javascript.", varEx("This package is written in $[info.language].", testObj));
        });
    });

    // Table index test
    describe('#tableIndex', function() {
        it('should be able to index table', function() {
            assert.equal("The first project contributor is Ola.", varEx("The first project contributor is $[contributors[0]].", testObj));
        });
    });

    // Multiple variables (All of the above)
    describe('#multiple variables', function() {
        it('should be able to handle all of the above at once', function() {
            assert.equal("Name: varEx, Language: Javascript and first contributor: Ola.", varEx("Name: $[name], Language: $[info.language] and first contributor: $[contributors[0]].", testObj));
        });
    });
});
