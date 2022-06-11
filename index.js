function varEx(inputString, inputObject) {
    // Find all variables by splitting string by $
    const suppliedVariables = inputString.split("$");
    
    return suppliedVariables.reduce((prevBlock, newBlock) => {
        // Check if current "block" is a string, or $[variable]
        const firstBracket = newBlock.indexOf('[');
        const secondBracket = newBlock.indexOf(']');
        const lastBracket = newBlock.lastIndexOf(']');

        // Check if variable block is semi-valid (Contains at least 1 opening bracket [ and 1 closing bracket ])
        // Also check if first opening bracket [ comes before the last closing bracket ]
        // Otherwise, this is not a variable block
        if(firstBracket !== secondBracket && firstBracket < lastBracket) {
            // Start with 1 open bracket by default, find everything between this open bracket
            var currentBracket = firstBracket+1;
            var openBrackets = 1;

            // This block could probably be done prettier
            while(openBrackets) {
                const b1 = newBlock.indexOf('[', currentBracket);
                const b2 = newBlock.indexOf(']', currentBracket);

                if(b1>=0 && b1<b2) {
                    // We encounter an opening bracket [ before a closing ]
                    // Hence increasing the openBrackets iterator
                    openBrackets++;
                    currentBracket = b1+1;
                } else if(b2>=0 && (b2<b1 || b1<0)) {
                    // We encounter a closing bracket ] before an opening [
                    // Hence decreasing the openBrackets iterator
                    openBrackets--;
                    currentBracket = b2+1;
                } else {
                    // This part should only ever be reached if there's an incomplete variable block - e.g $[array[i]
                    openBrackets = 0;
                }
            }

            // Find position of last bracket in varEx block
            const blockEnd = currentBracket-1;

            // suffixString equals what's remaining after the $[] variable "newBlock"
            const suffixString = newBlock.substr(blockEnd + 1, newBlock.length);

            // variable is what's inside the $[] variable newBlock - e.g $[grams_of_coffee] => grams_of_coffee
            var variable = newBlock.substr(firstBracket + 1, blockEnd - 1);

            // Replace all table indexes (and quotes) with . so we can split it into variable blocks
            // keep only value between
            // ["'`] group should be optional (so we also get replace index numbers)
            variable = variable.replace(/\[["'`]?(\w*)["'`]?\]/g, ".$1");

            // Now we split the variable by . to resolve child elements if provided          
            const variableBlocks = variable.split(".");

            // Initialize a variable on inputObject, this will be resolved step-by-step in the variableBlocks loop
            var resolvedValue = inputObject;

            // Loop through each variableBlock variable (e.g variable.children.grandchildren.tableindex)
            variableBlocks.forEach((varKey) => {
                // Resolve value step-by-step
                // Prevent errors by checking if resolvedValue is set
                if(resolvedValue)
                    resolvedValue = resolvedValue[varKey] !== null ? resolvedValue[varKey] : "";
            });
          
            // Add all the resolved values to the resultString
            return prevBlock + resolvedValue + suffixString;
        } else {
            // The block is just a string
            return prevBlock + newBlock;
        }
    })
}

module.exports = {
    varEx
}