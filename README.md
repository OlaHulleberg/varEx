<h1 align="center">VarEx</h1>

<div align="center">
  Simple variable resolution for template strings using `$[variable]` syntax ⭐
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
    <span> | </span>
    <a href="BENCHMARKS.md">
      Performance
    </a>
  </h3> 
</div>

<div align="center">
  <sub>Built with ❤︎ by
  <a href="https://github.com/OlaHulleberg">Ola Hulleberg</a>
</div>

---

```javascript
varEx("Hello $[user.name], you have $[notifications[0]] new messages!", data)
// → "Hello John, you have 5 new messages!"
```

---

## When to Use VarEx

**✅ Use VarEx when:**

- Building reusable templates (config files, reports, dynamic tables)
- Variables are unknown at template-writing time
- Need deep object/array access in templates
- Want clean separation between templates and data
- Need a lightweight, zero-dependency solution that works out of the box

**❌ Don't use VarEx when:**

- Variables are known at runtime → use template literals `${variable}`
- Only simple concatenation → use `+` or template literals
- Performance-critical single variable → direct access is faster

---

## Quick Start

```bash
npm install varex
```

```javascript
const { varEx } = require('varex');

const config = {
  server: { host: 'localhost', port: 3000 },
  users: [{ name: 'Alice', role: 'admin' }]
};

varEx('Server: $[server.host]:$[server.port]', config);
// → "Server: localhost:3000"

varEx('Welcome $[users[0].name] ($[users[0].role])', config);  
// → "Welcome Alice (admin)"
```

---

## Syntax Reference

| Pattern | Example | Result |
|---------|---------|--------|
| **Object property** | `$[user.name]` | Access nested properties |
| **Array index** | `$[items[0]]` | Get array element |
| **String keys** | `$[config['api-key']]` | Keys with special chars |
| **Deep nesting** | `$[app.db.users[0].profile.name]` | Complex paths |
| **Multiple quotes** | `$[obj["key"]]`, `$[obj['key']]`, `$[obj[\`key\`]]` | Any quote style |

**Invalid expressions return as-is:**

```javascript
varEx('Broken: $[unclosed[', data) // → "Broken: $[unclosed["
```

---

## Real-World Examples

### Config-Based Templates

**Define templates in config (no data available yet):**

```javascript
// config.json - written by developers, no runtime data
{
  "notifications": {
    "welcome": "Welcome $[user.name], you have $[stats.unreadCount] messages",
    "storage": "Using $[usage.current] of $[usage.limit] ($[usage.percentage]%)",
    "status": "Server: $[server.status] | DB: $[database.latency]ms"
  }
}
```

**Apply templates when data arrives from API:**
```javascript
const templates = require('./config.json').notifications;

// Data comes from API call
fetch('/api/user/dashboard')
  .then(res => res.json())
  .then(data => {
    // Now we have: { user: {name: "Alice"}, stats: {unreadCount: 3}, ... }
    
    const welcomeMsg = varEx(templates.welcome, data);
    const storageMsg = varEx(templates.storage, data);
    
    showNotification(welcomeMsg); // "Welcome Alice, you have 3 messages"
  });
```

### Component Templates with Dynamic Units

**Component defined without knowing what data it will display:**

```javascript
// ProductDisplay.js - written before knowing what products exist
const DISPLAY_FORMATS = {
  weight: '$[value] $[unit]',           // Could be "2.5 kg" or "5 lbs" 
  volume: '$[amount] $[unit]',          // Could be "500 ml" or "2 liters"
  price: '$$$[price] $[currency]',      // Could be "$10 USD" or "€8 EUR"
  stock: '$[count] $[item] remaining'   // Could be "5 bottles remaining"
};

function ProductDisplay({ product, format }) {
  // Product data comes from API, format chosen by user
  return varEx(DISPLAY_FORMATS[format], product);
}

// Usage - data arrives later from different sources:
<ProductDisplay 
  product={apiData}     // {value: 2.5, unit: "kg"} 
  format="weight" 
/>
// Renders: "2.5 kg"
```

### Report Generation from Database

**Template written before database query:**

```javascript
// report-templates.js - defined by business team
const REPORT_TEMPLATES = {
  daily: 'Daily Sales: $[sales.total] ($[sales.count] orders, avg: $[sales.average])',
  user: 'User $[user.id]: $[user.orders] orders, $$$[user.revenue] revenue',
  error: 'Error in $[error.service] at $[error.timestamp]: $[error.message]'
};

// Later, when generating reports from database:
async function generateDailyReport(date) {
  const salesData = await db.query('SELECT * FROM daily_sales WHERE date = ?', date);
  
  // Data structure unknown when template was written
  return varEx(REPORT_TEMPLATES.daily, salesData);
}

// Similarly for error logging:
function logError(service, error) {
  const errorData = {
    error: { service, timestamp: Date.now(), message: error.message }
  };
  
  console.log(varEx(REPORT_TEMPLATES.error, errorData));
}
```

### Dynamic Table Configuration

**Table columns defined before knowing data structure:**

```javascript
// table-config.json - defines how to display any user data
{
  "userTable": {
    "columns": [
      {
        "header": "User", 
        "template": "$[name] ($[email])"
      },
      {
        "header": "Activity",
        "template": "$[stats.loginCount] logins, last: $[lastLogin]"  
      },
      {
        "header": "Storage",
        "template": "$[usage.used]/$[usage.total] GB"
      }
    ]
  }
}

// Component renders any data matching the template structure:
function DataTable({ config, data }) {
  return (
    <table>
      {data.map(row => (
        <tr>
          {config.columns.map(col => (
            <td>{varEx(col.template, row)}</td>
          ))}
        </tr>
      ))}
    </table>
  );
}

// Works with any API response that matches template structure
```

---

## Performance

VarEx handles most use cases efficiently:

- **Simple variables**: ~1.6M ops/second  
- **Nested objects**: ~700K ops/second
- **Array access**: ~650K ops/second  
- **Complex templates**: ~300K ops/second

**[📊 Full Performance Benchmarks](BENCHMARKS.md)**

For high-frequency operations (>1M/sec), consider direct property access or caching resolved templates.

---

## Limitations

- **No functions**: `$[user.getName()]` won't work
- **No expressions**: `$[count + 1]` isn't supported
- **No conditionals**: No if/else logic
- **String keys only**: Array indices must be numbers or strings
- **Bracket validation**: Malformed `$[obj[key` returns as-is

**For complex logic, use a proper templating engine like Handlebars or Mustache.**

---

## API Reference

### `varEx(template, data)`

**Parameters:**

- `template` (string): Template with `$[variable]` placeholders
- `data` (object): Data object to resolve variables from

**Returns:** String with variables resolved

**Behavior:**

- Missing variables return empty string
- Invalid brackets return unchanged  
- Handles `null`/`undefined` gracefully
- Supports nested objects and arrays

---

## Contributing

Run tests: `npm test`  
Run benchmarks: `npm run benchmark`

---

**Built for developers who value simplicity and performance.**
