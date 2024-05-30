const APP_ID = '<YOUR_APP_ID>';
const BASE_URL = 'openexchangerates.org';
const https = require('https');

const fromCurrency = 'USD';
const toCurrency = 'EUR';
const amount = 100;

// The API allows specifying USD as the base, but nothing else. I'm
// setting it here just to show how to pass multiple parameters
// (separate with &).
const path = `/api/latest.json?app_id=${APP_ID}&base=${fromCurrency}`;

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
    const converted = body.rates[toCurrency] * amount;
    console.log(`${amount} (${fromCurrency}) = ${converted} (${toCurrency})`);
  });
});
