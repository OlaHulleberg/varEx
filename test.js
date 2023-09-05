// const varEx = require('./index').varEx;
const { varEx } = require("./index");
const assert = require("assert");

const testObj = {
  name: "varEx",
  info: {
    language: "Javascript",
    release: {
      npm: "https://www.npmjs.com/package/varex",
      git_repo: "https://github.com/OlaHulleberg/varEx",
    },
  },
  contributors: ["Ola"],
  type: "free",
};

describe("varEx", function () {
  // Variable test
  describe("#variable", function () {
    it("should be able to parse object", function () {
      assert.equal(
        "Hello, this package is called varEx.",
        varEx("Hello, this package is called $[name].", testObj)
      );
    });
  });

  // Variable inside object test
  describe("#object", function () {
    it("should be able to parse subvariable", function () {
      assert.equal(
        "This package is written in Javascript.",
        varEx("This package is written in $[info.language].", testObj)
      );
    });
  });

  describe("#indexes", function () {
    // Table number index test
    it("should be able to index table", function () {
      assert.equal(
        "The first project contributor is Ola.",
        varEx("The first project contributor is $[contributors[0]].", testObj)
      );
    });

    // Multiple indexes
    it("should be able to handle multiple indexes", function () {
      assert.equal(
        "This was written in Javascript and released at https://www.npmjs.com/package/varex.",
        varEx(
          "This was written in $[info['language']] and released at $[info['release']['npm']].",
          testObj
        )
      );
    });

    // String table index
    it("should be able to handle string indexes", function () {
      assert.equal(
        "This was written in Javascript.",
        varEx("This was written in $[info['language']].", testObj)
      );
    });
  });

  describe("#multiple variables", function () {
    // Multiple variables (All of the above)
    it("should be able to handle all of the above at once", function () {
      assert.equal(
        "Name: varEx, Language: Javascript and first contributor: Ola. The package is released at https://www.npmjs.com/package/varex.",
        varEx(
          "Name: $[name], Language: $[info.language] and first contributor: $[contributors[0]]. The package is released at $[info['release']['npm']].",
          testObj
        )
      );
    });
  });

  describe("#symbols", function () {
    // Underscore
    it("should be able to handle variables with underscores", function () {
      assert.equal(
        "The repository URL is https://github.com/OlaHulleberg/varEx",
        varEx("The repository URL is $[info.release['git_repo']]", testObj)
      );
      assert.equal(
        "The repository URL is https://github.com/OlaHulleberg/varEx",
        varEx("The repository URL is $[info.release.git_repo]", testObj)
      );
    });
  });

  describe("#symbolInString", function () {
    // $ in string
    it("should be able to handle text that includes $ signs", function () {
      assert.equal(
        "This package costs $0.00, and is therefore free.",
        varEx("This package costs $0.00, and is therefore $[type].", testObj)
      );
    });
  });

  // Quotes
  describe("#quotes", function () {
    // table index with " quotes
    it('should be able to handle table index with " quotes', function () {
      assert.equal(
        "The repository URL is https://github.com/OlaHulleberg/varEx",
        varEx(`The repository URL is $[info.release["git_repo"]]`, testObj)
      );
    });

    // table index with ' quotes
    it(`should be able to handle table index with ' quotes`, function () {
      assert.equal(
        "The repository URL is https://github.com/OlaHulleberg/varEx",
        varEx(`The repository URL is $[info.release['git_repo']]`, testObj)
      );
    });

    // table index with ` quotes
    it("should be able to handle table index with ` quotes", function () {
      assert.equal(
        "The repository URL is https://github.com/OlaHulleberg/varEx",
        varEx("The repository URL is $[info.release[`git_repo`]]", testObj)
      );
    });
  });
});
