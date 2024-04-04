BASE_URL = 'https://openexchangerates.org/api';
APP_ID = 'cfe66050a8494102bf905fbceeffa695';

async function getCurrencies() {
  const response = await fetch(`${BASE_URL}/currencies.json`);
  const data = await response.json();
  return data;
}

async function convertCurrency(fromCurrency, toCurrency, amount) {
    const fromResponse = await fetch(`${BASE_URL}/latest.json?app_id=${APP_ID}`); //returns array of rates from USD to other currencies
    const fromData = await fromResponse.json();
	
	  if(fromData.error) throw new Error(fromData.description);

    const amountInUSD = amount / fromData.rates[fromCurrency]; //get initial amount in USD
	
	 
	  const toResponse = await fetch(`${BASE_URL}/latest.json?app_id=${APP_ID}`); //returns array of rates from USD to other currencies
    const toData = await toResponse.json();
	
	  if(toData.error) throw new Error(toData.description);

    const converted = toData.rates[toCurrency] * amountInUSD; //get USD amount in target currency
    const ts = new Date(toData.timestamp * 1000).toLocaleString();
    return { converted, ts };
}

async function populateCurrencies() {
    const currencies = await getCurrencies();
    const selects = [document.getElementById('from'), document.getElementById('to')];
    for (const select of selects) {
        select.innerHTML = '';
        for (const [symbol, name] of Object.entries(currencies)) {
            const option = document.createElement('option');
            option.value = symbol;
            option.textContent = `${name} (${symbol})`;
            select.appendChild(option);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateCurrencies();

    const convertButton = document.getElementById('convertBtn');
    const amtInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from');
    const toCurrencySelect = document.getElementById('to');
    const resultDiv = document.getElementById('result');
    const errorMsg = document.getElementById('errorMsg');
  
    convertButton.addEventListener('click', async () => {
        const value = parseFloat(amtInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
  
        if (isNaN(value)) {
            errorMsg.textContent = 'Please enter a valid number.';
            return;
        }

        if (fromCurrency === toCurrency) {
            errorMsg.textContent = 'Please select different currencies.';
            return;
        }

        try {
            const { converted, ts } = await convertCurrency(fromCurrency, toCurrency, value);
            resultDiv.textContent = `${value} ${fromCurrency} = ${converted} ${toCurrency} (as of ${ts})`;
            errorMsg.textContent = '';
        } catch (e) {
            resultDiv.textContent = '';
            errorMsg.textContent = e.message;
        }
    });
 });
  
