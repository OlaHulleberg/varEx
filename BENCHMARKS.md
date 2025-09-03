# Performance Benchmarks

VarEx is optimized for real-world template processing scenarios. Below are performance benchmarks across various use cases.

## Test Environment
- **Node.js**: v22.19.0 (LTS)
- **Hardware**: Standard development machine
- **Iterations**: 100,000 per test (with 1,000 warmup iterations)

## Results

| Test Case | Ops/Second | Avg Time (μs) | Use Case |
|-----------|------------|---------------|----------|
| **Simple Variable** | 1,668,782 | 0.599 | `$[name]` |
| **String Index** | 1,080,966 | 0.925 | `$[config['key']]` |
| **Deep Nested** | 1,055,836 | 0.947 | `$[app.config.tokens[1]]` |
| **Non-Existent Keys** | 823,197 | 1.215 | `$[missing.path]` |
| **Array Access** | 650,857 | 1.536 | `$[users[0].name]` |
| **Nested Objects** | 701,852 | 1.425 | `$[app.config.database.host]` |
| **Mixed Valid/Invalid** | 605,789 | 1.651 | Mixed scenarios |
| **Multiple Quotes** | 505,553 | 1.978 | `$[obj["key"]]` & `$[obj['key']]` |
| **Complex Multi-Variable** | 301,690 | 3.315 | Multiple vars in one template |
| **Long Template** | 94,167 | 10.619 | 10+ variables in one string |
| **No Variables** | 450,535,687 | 0.002 | Plain text (baseline) |
| **Invalid Brackets** | 2,018,131 | 0.496 | `$[unclosed[` |

## Performance Characteristics

### ✅ **Fast Scenarios** (>500K ops/sec)
- Simple variable resolution
- String-based object access
- Deep nested arrays
- Missing key handling
- Invalid bracket detection

### ⚠️ **Moderate Scenarios** (100K-500K ops/sec)
- Multiple variables per template
- Complex nested object/array combinations
- Mixed valid/invalid expressions

### 🐌 **Heavy Scenarios** (<100K ops/sec)
- Long templates with 10+ variables
- Extremely complex nested structures

## Memory Usage
- **RSS**: ~47 MB during testing
- **Heap Used**: ~3.4 MB
- **Memory Efficient**: No memory leaks detected during extended testing

## Real-World Performance Expectations

For typical use cases:

- **Config Templates**: `"Server: $[host]:$[port]"` → **~700K ops/sec**
- **User Messages**: `"Welcome $[user.name]!"` → **~1.6M ops/sec**  
- **Error Messages**: `"Error in $[module.name] at line $[error.line]"` → **~600K ops/sec**
- **Report Generation**: Multiple variables in templates → **~300K ops/sec**

## Recommendations

- **Use VarEx when**: Template complexity makes it worthwhile (vs simple concatenation)
- **Avoid for**: Single variable substitution (use template literals instead)
- **Optimal for**: 2-10 variables per template with moderate nesting
- **Consider alternatives for**: >20 variables per template or real-time rendering at scale

## Running Benchmarks

```bash
npm run benchmark
```

This will run the complete benchmark suite and display detailed performance metrics for your specific environment.