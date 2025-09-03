const VAREX_REGEX = /\$\[(['"`\w[\].]+)\]/g;
const BRACKET_REGEX = /\[["'`]?(\w*)["'`]?\]/g;

function varEx(inputString, inputObject) {
  if (!inputString.includes("$[")) return inputString;

  return inputString.replace(VAREX_REGEX, (_, key) => {
    const openBrackets = key.split("[").length;
    const closeBrackets = key.split("]").length;
    if (openBrackets !== closeBrackets) return `$[${key}]`;

    const normalizedKey = key.replace(BRACKET_REGEX, ".$1");
    const keys = normalizedKey.split(".");
    
    let value = inputObject;
    for (let i = 0; i < keys.length; i++) {
      if (value == null) return "";
      value = value[keys[i]];
    }
    
    return value == null ? "" : value;
  });
}

module.exports = {
  varEx,
};
