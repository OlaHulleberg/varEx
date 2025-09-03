# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VarEx is a simple Node.js library for resolving variables inside strings using the `$[variable]` syntax. The library supports nested objects, arrays, and various indexing methods. It was originally created to solve dynamic table formatting problems where template strings need to be defined upfront and applied to runtime data.

## Commands

### Testing
- `npm test` - Run the complete test suite using Mocha
- `mocha` - Alternative way to run tests directly

### Development
- `npm install` - Install dependencies (only Mocha for testing)
- `node examples/simple.js` - Run the simple usage example
- `node test.js` - Run tests directly with Node (though `npm test` is preferred)

## Architecture

### Core Module (`index.js`)
The entire library consists of a single function `varEx(inputString, inputObject)`:

- **Input validation**: Early returns if no `$[]` blocks are found
- **Regex parsing**: Uses `/\$\[(['"`\w[\].]+)\]/g` to find variable blocks
- **Bracket validation**: Ensures equal open `[` and close `]` brackets for valid blocks
- **Key normalization**: Converts array notation `[key]` to dot notation `.key`
- **Recursive resolution**: Traverses nested objects using dot-separated paths
- **Error handling**: Returns empty string for undefined/null values, preserves invalid blocks

### Test Suite (`test.js`)
Comprehensive Mocha test suite covering:
- Basic variable resolution
- Nested object access (`info.language`)
- Array indexing with numbers (`contributors[0]`)
- String-based indexing (`info['language']`)
- Multiple quote types (single, double, backtick)
- Multiple variables in single string
- Special characters and symbols
- Invalid/malformed blocks

### Example (`examples/simple.js`)
Demonstrates practical usage with nested objects and arrays, showing how to resolve complex variable expressions.

## Variable Expression Syntax

- `$[variable]` - Basic variable
- `$[object.property]` - Nested object access
- `$[array[0]]` - Array access by index
- `$[object['key']]` - Object access with string key (supports ', ", ` quotes)
- `$[object.nested.array[0]]` - Complex nested access

Invalid blocks (unmatched brackets) are returned as-is without processing.

## CI/CD

GitHub Actions runs tests on Node.js 22.19.0 (LTS) for all commits and PRs.