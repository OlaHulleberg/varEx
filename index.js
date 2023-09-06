function varEx(inputString, inputObject) {
  // Find all $[] blocks, and run a function for each block found.
  // Returns a complete string where all VarEx blocks have been parsed
  return inputString.replace(/\$\[(['"`\w[\].]+)\]/g, (_, key) => {
    // Initialize inputObject to be recursively parsed
    var resolvedValue = inputObject;

    // Check that we have equal amounts of open brackets [ as closing brackets ]
    // This allows us to check if the VarEx block is complete
    const openBracketCount = (key.match(/\[/g) || []).length; // Number of open brackets
    const closeBracketCount = (key.match(/\]/g) || []).length; // Number of closed brackets
    if (openBracketCount !== closeBracketCount) return `$[${key}]`; // Perform above check, and return key as it was parsed if there are brackets left open

    // Replace all array blocks [] with .
    // eg. table['a'] becomes table.a
    // table[1] becomes table.1
    const cleanKey = key.replace(/\[["'`]?(\w*)["'`]?\]/g, ".$1");

    // Now we split the variable by . to resolve child elements if provided
    const variableBlocks = cleanKey.split(".");

    // Loop through each variableBlock variable (e.g variable.children.grandchildren.tableindex)
    variableBlocks.forEach((varKey) => {
      // Resolve value step-by-step
      // Prevent errors by checking if resolvedValue is set
      if (resolvedValue)
        resolvedValue =
          resolvedValue[varKey] !== null ? resolvedValue[varKey] : "";
    });

    // Return the resolved variable
    return resolvedValue;
  });
}

module.exports = {
  varEx,
};
