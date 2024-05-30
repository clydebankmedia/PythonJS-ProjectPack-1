BASE_URL = 'https://openexchangerates.org/api';
const APP_ID = '<YOUR_APP_ID>'; // replace this with your own API key

// Technically these variables are not necessary: the HTML5
// specification states that any HTML element with an id attribute is
// accessible via the window object, which means that you can treat
// them as variables you get for free. However, it is frowned upon to
// actually use these. For one thing, without an explicit variable, it
// is easy to forget that you are using a name to refer to an element
// and accidentally create a variable with the same name referring to
// something else. There are also some differences in how different
// browsers handle this.
const convertBtn = document.getElementById('convertBtn');
const amountInput = document.getElementById('amountInput');
const fromSelect = document.getElementById('fromSelect');
const toSelect = document.getElementById('toSelect');
const resultDiv = document.getElementById('resultDiv');
const errorMsgDiv = document.getElementById('errorMsgDiv');

async function getCurrencies() {
  const response = await fetch(`${BASE_URL}/currencies.json`);
  const data = await response.json();
  if (data.error) throw new Error(data.description);
  return data;
}

async function populateCurrencies() {
  const currencies = await getCurrencies();
  const selects = [document.getElementById('fromSelect'), document.getElementById('toSelect')];
  for (const select of selects) {
    select.innerHTML = '';
    for (const [symbol, name] of Object.entries(currencies)) {
      const option = document.createElement('option');
      option.value = symbol;
      option.textContent = `${symbol} (${name})`;
      select.appendChild(option);
    }
  }

  // Set defaults
  selects[0].value = "USD";
  selects[1].value = "EUR";
}

document.addEventListener('DOMContentLoaded', () => {

  // Notice I am using the catch method, not a try/catch block. Using
  // a try/catch block won't work since populateCurrencies is an async
  // method. You *could* await it, but then you're not truly allowing
  // asynchronous execution.
  populateCurrencies().catch(e => {
    errorMsgDiv.textContent = e.message;
    convertBtn.disabled = true;
  });
});

// Note: for the free tier, fromCurrency MUST be USD! Because of this,
// there's no reason to have the fromCurrency parameter at all, but
// I've kept it for this step to show you how multiple parameters
// might be passed to the API endpoint (separate them with &).
async function convertCurrency(fromCurrency, toCurrency, amount) {
  const response = await fetch(`${BASE_URL}/latest.json?app_id=${APP_ID}&base=${fromCurrency}`);
  const data = await response.json();

  if (data.error) throw new Error(data.description);
  
  const converted = data.rates[toCurrency] * amount;
  return converted;
}

function handleError(msg) {
  errorMsgDiv.textContent = msg;
  resultDiv.textContent = '';
}

convertBtn.addEventListener('click', async () => {
  const amount = parseFloat(amountInput.value);
  const fromCurrency = fromSelect.value;
  const toCurrency = toSelect.value;

  if (isNaN(amount))
    return handleError("Please enter a valid number.");
  if (amount < 0)
    return handleError("Please enter a positive number.");
  if (fromCurrency !== "USD")
    return handleError("This version only supports converting from USD.");
  if (fromCurrency === toCurrency)
    return handleError("Please select different currencies.");

  try {
    const converted = await convertCurrency(fromCurrency, toCurrency, amount);
    resultDiv.textContent = `${amount} ${fromCurrency} = ${converted} ${toCurrency}`;
    errorMsgDiv.textContent = '';
  } catch (e) {
    handleError(e.message);
  }
});
