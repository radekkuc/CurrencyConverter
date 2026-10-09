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

let exchangeRate;

sourceCurrencySelector.addEventListener("change", selectorCurrencyChanged);

targetCurrencySelector.addEventListener("change", selectorCurrencyChanged);

swapCurrenciesButton.addEventListener("click", swapCurrenciesButtonClick);

sourceAmountInput.addEventListener("input", sourceInputChanged);

targetAmountInput.addEventListener("input", targetInputChanged);

async function swapCurrenciesButtonClick() {
    try {
        swapCurrency();
        const newRate = await getExchangeRate();
        exchangeRate = newRate;
        convertFromSource();   
        updateSummary();
    }
    catch(error) {
        console.error(error);
        swapCurrency();
    }       
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
    try {
        const newRate = await getExchangeRate();
        exchangeRate = newRate;
        convertFromSource();
        updateSummary();        
    }
    catch(error) {
        console.error(error);
    }
}

async function getExchangeRate() {
    const url = baseUrl + `/${sourceCurrencySelector.value}/${targetCurrencySelector.value}`;
    const apiResponse = await fetch(url);
    if(!apiResponse.ok) {
        throw new Error(`HTTP error: ${apiResponse.status}`);
    }
    const jsonObject = await apiResponse.json();
    return jsonObject.rate;
}

async function getCurrencies() {
    const url = "https://api.frankfurter.dev/v2/currencies";
    const apiResponse = await fetch(url);
    if(!apiResponse.ok) {
        throw Error(`HTTP error: ${apiResponse.status}`);
    }
    const jsonObject = await apiResponse.json();
    return jsonObject;
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

function loadCurrencies(selector, currencies) {
    for(const currency of currencies) {
        const option = document.createElement("option");
        option.value = currency;
        option.textContent = currency;
        selector.appendChild(option);
    }    
}

async function main() {
    try {
        const currencyObject = await getCurrencies();
        const currencies = currencyObject.map(currency => currency.iso_code);
        loadCurrencies(sourceCurrencySelector, currencies);
        loadCurrencies(targetCurrencySelector, currencies);
        sourceAmountInput.value = 1;
        sourceCurrencySelector.value = "EUR";
        targetCurrencySelector.value = "USD"
        const newRate = await getExchangeRate();
        exchangeRate = newRate;
        convertFromSource();
        updateSummary();
    }
    catch(error) {
        console.error(error);
    }
}

main();