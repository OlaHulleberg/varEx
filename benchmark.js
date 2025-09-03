const { varEx } = require('./index');

const ITERATIONS = 100000;
const WARMUP_ITERATIONS = 1000;

const complexTestData = {
  app: {
    name: 'VarEx Performance Test',
    version: '2.0.0',
    config: {
      database: {
        host: 'localhost',
        port: 5432,
        credentials: {
          username: 'admin',
          password: 'secret123',
          tokens: ['abc123', 'def456', 'ghi789']
        }
      },
      features: {
        logging: true,
        caching: false,
        authentication: {
          enabled: true,
          providers: ['oauth', 'saml', 'local']
        }
      }
    },
    metadata: {
      authors: ['John Doe', 'Jane Smith', 'Bob Johnson'],
      tags: ['performance', 'template', 'variable-resolution'],
      stats: {
        downloads: 150000,
        stars: 2500,
        forks: 180
      }
    }
  },
  users: [
    { id: 1, name: 'Alice', role: 'admin', active: true },
    { id: 2, name: 'Bob', role: 'user', active: false },
    { id: 3, name: 'Charlie', role: 'moderator', active: true }
  ],
  settings: {
    theme: 'dark',
    locale: 'en-US',
    notifications: {
      email: true,
      push: false,
      sms: true
    }
  }
};

const testCases = [
  {
    name: 'Simple Variable',
    template: 'App: $[app.name]',
    iterations: ITERATIONS
  },
  {
    name: 'Nested Object Access',
    template: 'Database: $[app.config.database.host]:$[app.config.database.port]',
    iterations: ITERATIONS
  },
  {
    name: 'Array Index Access',
    template: 'First user: $[users[0].name] ($[users[0].role])',
    iterations: ITERATIONS
  },
  {
    name: 'String Index Access',
    template: 'Username: $[app.config.database.credentials[\'username\']]',
    iterations: ITERATIONS
  },
  {
    name: 'Deep Nested Arrays',
    template: 'Token: $[app.config.database.credentials.tokens[1]]',
    iterations: ITERATIONS
  },
  {
    name: 'Multiple Quote Types',
    template: 'Auth: $[app.config.features.authentication["enabled"]] with $[app.config.features.authentication[`providers`][0]]',
    iterations: ITERATIONS
  },
  {
    name: 'Complex Multi-Variable',
    template: '$[app.name] v$[app.version] by $[app.metadata.authors[0]] - $[app.metadata.stats.downloads] downloads, $[app.metadata.stats.stars] stars',
    iterations: ITERATIONS
  },
  {
    name: 'Long Template',
    template: 'App: $[app.name] v$[app.version] running on $[app.config.database.host]:$[app.config.database.port] with user $[app.config.database.credentials.username]. Features: logging=$[app.config.features.logging], auth=$[app.config.features.authentication.enabled]. Users: $[users[0].name] ($[users[0].role]), $[users[1].name] ($[users[1].role]), $[users[2].name] ($[users[2].role]). Settings: theme=$[settings.theme], locale=$[settings.locale].',
    iterations: ITERATIONS
  },
  {
    name: 'No Variables (Baseline)',
    template: 'This is a plain text string with no variables at all.',
    iterations: ITERATIONS
  },
  {
    name: 'Invalid Brackets',
    template: 'Invalid: $[app.config.missing[incomplete] and $[another.missing[also.incomplete',
    iterations: ITERATIONS
  },
  {
    name: 'Non-Existent Keys',
    template: 'Missing: $[app.nonexistent] and $[completely.missing.path]',
    iterations: ITERATIONS
  },
  {
    name: 'Mixed Valid/Invalid',
    template: 'Valid: $[app.name], Invalid: $[app.missing[, Valid: $[settings.theme], Invalid: $[broken.path]',
    iterations: ITERATIONS
  }
];

function benchmark(name, template, data, iterations) {
  for (let i = 0; i < WARMUP_ITERATIONS; i++) {
    varEx(template, data);
  }

  const start = process.hrtime.bigint();
  for (let i = 0; i < iterations; i++) {
    varEx(template, data);
  }
  const end = process.hrtime.bigint();

  const totalTimeMs = Number(end - start) / 1000000;
  const opsPerSec = Math.round(iterations / (totalTimeMs / 1000));
  const avgTimeUs = (totalTimeMs * 1000) / iterations;

  return {
    name,
    totalTimeMs: totalTimeMs.toFixed(2),
    opsPerSec: opsPerSec.toLocaleString(),
    avgTimeUs: avgTimeUs.toFixed(3)
  };
}

function runBenchmarks() {
  console.log('🚀 VarEx Performance Benchmark');
  console.log('================================');
  console.log(`Warmup iterations: ${WARMUP_ITERATIONS.toLocaleString()}`);
  console.log(`Test iterations: ${ITERATIONS.toLocaleString()}`);
  console.log('');

  const results = [];
  
  for (const testCase of testCases) {
    const result = benchmark(testCase.name, testCase.template, complexTestData, testCase.iterations);
    results.push(result);
    
    console.log(`📊 ${result.name}`);
    console.log(`   Total: ${result.totalTimeMs}ms | Ops/sec: ${result.opsPerSec} | Avg: ${result.avgTimeUs}μs`);
    console.log('');
  }

  console.log('📈 Summary');
  console.log('----------');
  
  const fastest = results.reduce((prev, curr) => 
    parseFloat(curr.avgTimeUs) < parseFloat(prev.avgTimeUs) ? curr : prev
  );
  
  const slowest = results.reduce((prev, curr) => 
    parseFloat(curr.avgTimeUs) > parseFloat(prev.avgTimeUs) ? curr : prev
  );

  console.log(`⚡ Fastest: ${fastest.name} (${fastest.avgTimeUs}μs avg)`);
  console.log(`🐌 Slowest: ${slowest.name} (${slowest.avgTimeUs}μs avg)`);
  
  const totalOps = results.reduce((sum, result) => {
    return sum + parseInt(result.opsPerSec.replace(/,/g, ''));
  }, 0);
  
  console.log(`🔥 Total ops/sec across all tests: ${totalOps.toLocaleString()}`);

  const memUsage = process.memoryUsage();
  console.log('');
  console.log('💾 Memory Usage');
  console.log(`   RSS: ${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Heap Used: ${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   External: ${(memUsage.external / 1024 / 1024).toFixed(2)} MB`);
}

if (require.main === module) {
  runBenchmarks();
}

module.exports = { runBenchmarks };