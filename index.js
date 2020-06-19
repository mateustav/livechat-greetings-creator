const https = require('https');

const options = require('./livechat_config.js');
const entries = require('./csv_parser.js');
const MAX_ENTRIES = 8;
entries().then(function(entries) {
  for (let entry of entries) {
    const rules = entry.page_rule.split('\n');
    if (rules.length > MAX_ENTRIES) {
      const splitRules = rules.reduce((acc, _, i) =>
        (i % MAX_ENTRIES)
          ? acc
          : [...acc, rules.slice(i, i + MAX_ENTRIES)]
      , []);

      for (let i in splitRules) {
          createGreeting(`${entry.name} - ${i}`, formatRules(splitRules[i]));
      }
    }
    else {
      createGreeting(entry.name, formatRules(rules));
    }
  }
});

function formatRules(entry) {
  const rulesData = [];
  for (let rule of entry) {
    rulesData.push({
      "operator": "contains",
      "type": "url_current",
      "value": rule
    });
  }
  // return rulesData.map((v) => v.replace(/\n/g, ''));
  return rulesData;
}

function createGreeting(name, data) {
  const rules = data;
  console.log(data);
  const postData = JSON.stringify({
    group: 2,
    name,
    rules
  });

  const req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
  
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });
  
  req.on('error', (e) => {
    console.error(e);
  });
  
  req.write(postData);
  req.end(); 
}