const sourceAmountInput = document.getElementById("source-amount");
const targetAmountInput = document.getElementById("target-amount"); 

const sourceAmountSummary = document.getElementById("source-amount-summary");
const targetAmountSummary = document.getElementById("target-amount-summary");

const sourceCurrencySelector = document.getElementById("source-currency-selector");
const targetCurrencySelector = document.getElementById("target-currency-selector");

const sourceCurrencySummary = document.getElementById("source-currency-summary");
const targetCurrencySummary = document.getElementById("target-currency-summary");

const swapCurrenciesButton = document.getElementById("swap-currencies-button");

const baseUrl = "https://api.frankfurter.dev/v2/rate";

let sourceValue = 1;
let exchangeRate = 0.8; 
let targetValue = sourceValue * exchangeRate;

let latestCurrencySource = sourceCurrencySelector.value;
let latestCurrencyTarget = targetCurrencySelector.value;

sourceAmountInput.value = sourceValue;
targetAmountInput.value = targetValue;
sourceCurrencySelector.value = "USD";
targetCurrencySelector.value = "EUR";

sourceCurrencySelector.addEventListener("change", selectorCurrencyChanged);

targetCurrencySelector.addEventListener("change", selectorCurrencyChanged);

swapCurrenciesButton.addEventListener("click", swapCurrenciesButtonClick);

sourceAmountInput.addEventListener("input", sourceInputChanged);

targetAmountInput.addEventListener("input", targetInputChanged);

async function swapCurrenciesButtonClick() {
    swapCurrency();
    exchangeRate = await getExchangeRate();
    convertFromSource();   
    targetAmountSummary.textContent = targetAmountInput.value;     
}

function targetInputChanged() {
    convertFromTarget();
    updateSummary();   
}

function sourceInputChanged() {
    convertFromSource();
    updateSummary();     
}

async function selectorCurrencyChanged() {
    exchangeRate = await getExchangeRate();
    convertFromSource();
    updateSummary();
}

async function getExchangeRate() {
    try {
        const url = baseUrl + `/${sourceCurrencySelector.value}/${targetCurrencySelector.value}`;
        const apiResponse = await fetch(url);
        const jsonObject = await apiResponse.json();
        return jsonObject.rate;
    }
    catch(error) {
        console.error(error);
    }
}

async function getCurrencies() {
    try {
        const url = "https://api.frankfurter.dev/v2/currencies";
        const apiResponse = await fetch(url);
        const jsonObject = await apiResponse.json();
        return jsonObject;
    }
    catch(error) {
        console.error(error);
    }
}

function updateSummary() {
    sourceAmountSummary.textContent = sourceAmountInput.value;
    targetAmountSummary.textContent = targetAmountInput.value;   

    sourceCurrencySummary.textContent = sourceCurrencySelector.value;
    targetCurrencySummary.textContent = targetCurrencySelector.value;
}

function convertFromSource() {
    targetAmountInput.value = (sourceAmountInput.value * exchangeRate).toFixed(2);
}

function convertFromTarget() {
    sourceAmountInput.value = (targetAmountInput.value / exchangeRate).toFixed(2);
}

function swapCurrency() {
    const sourceCurrencyValue = sourceCurrencySelector.value;
    sourceCurrencySelector.value = targetCurrencySelector.value;
    targetCurrencySelector.value = sourceCurrencyValue;

    const sourceCurrencyText = sourceCurrencySummary.textContent;
    sourceCurrencySummary.textContent = targetCurrencySummary.textContent;
    targetCurrencySummary.textContent = sourceCurrencyText;  
}


async function main() {
    const currencyObject = await getCurrencies();
    const currencies = currencyObject.map(currency => currency.iso_code);

    for(const currency of currencies) {
        const option = document.createElement("option");
        option.value = currency;
        option.textContent = currency;
        sourceCurrencySelector.appendChild(option);
    }

    for(const currency of currencies) {
        const option = document.createElement("option");
        option.value = currency;
        option.textContent = currency;
        targetCurrencySelector.appendChild(option);
    }

}

main();