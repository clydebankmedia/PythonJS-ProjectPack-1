const APP_ID = '<YOUR_APP_ID>';
const BASE_URL = 'openexchangerates.org';
const https = require('https');

const [fromCurrency, toCurrency, amount] = process.argv.slice(2, 5);

if (!fromCurrency || !toCurrency || !amount) {
  console.error('Usage: node app.js <fromCurrency> <toCurrency> <amount>');
  process.exit(1);
}

// The API allows specifying USD as the base, but nothing else. I'm
// setting it here just to show how to pass multiple parameters
// (separate with &).
const path = `/api/latest.json?app_id=${APP_ID}&base=USD`;

const options = {
  hostname: BASE_URL,
  path: path,
  method: 'GET',
};

const req = https.get(options, response => {
  const data = [];

  response.on('data', chunk => data.push(chunk));

  response.on('end', () => {
    const body = JSON.parse(data.join(''));

    // Since we're assuming rates are symmetric, we can *divide* by
    // the USD --> fromCurrency rate to convert from fromCurrency into
    // USD.
    const amountInUSD = amount / body.rates[fromCurrency];
    
    const converted = body.rates[toCurrency] * amountInUSD;
    const ts = new Date(body.timestamp * 1000).toLocaleString();
    console.log(`As of ${ts}: ${amount} (${fromCurrency}) = ${converted} (${toCurrency})`);

  });
});
