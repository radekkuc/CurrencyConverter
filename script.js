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
const currencies = [
    "EUR",
    "USD",
    "GBP",
    "PLN"
]

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

let sourceValue = 1;
let exchangeRate = 0.8; 
let targetValue = sourceValue * exchangeRate;

let latestCurrencySource = sourceCurrencySelector.value;
let latestCurrencyTarget = targetCurrencySelector.value;

sourceAmountInput.value = sourceValue;
targetAmountInput.value = targetValue;
sourceCurrencySelector.value = "USD";
targetCurrencySelector.value = "EUR";

sourceCurrencySelector.addEventListener("change", sourceSelectorChanged);

targetCurrencySelector.addEventListener("change", targetSelectorChanged);

swapCurrenciesButton.addEventListener("click", swapCurrenciesButtonClick);

sourceAmountInput.addEventListener("input", sourceInputChanged);

targetAmountInput.addEventListener("input", targetInputChanged);

async function swapCurrenciesButtonClick() {
    const sourceCurrencyValue = sourceCurrencySelector.value;
    sourceCurrencySelector.value = targetCurrencySelector.value;
    targetCurrencySelector.value = sourceCurrencyValue;

    const sourceCurrencyText = sourceCurrencySummary.textContent;
    sourceCurrencySummary.textContent = targetCurrencySummary.textContent;
    targetCurrencySummary.textContent = sourceCurrencyText;  

    exchangeRate = await getExchangeRate();
    targetAmountInput.value = exchangeRate * sourceAmountInput.value;   
    targetAmountSummary.textContent = targetAmountInput.value;     
}

async function targetInputChanged() {
    // if latest currency same as current do not make new api call
    exchangeRate = await getExchangeRate();
    sourceAmountInput.value = targetAmountInput.value / exchangeRate;
    sourceAmountSummary.textContent = sourceAmountInput.value;
    targetAmountSummary.textContent = targetAmountInput.value;   
}

async function sourceInputChanged() {
    // if latest currency same as current do not make new api call
    exchangeRate = await getExchangeRate();
    targetAmountInput.value = exchangeRate * sourceAmountInput.value;   
    sourceAmountSummary.textContent = sourceAmountInput.value;
    targetAmountSummary.textContent = targetAmountInput.value;     
}

async function sourceSelectorChanged() {
    sourceCurrencySummary.textContent = sourceCurrencySelector.value;
    latestCurrencySource = sourceCurrencySelector.value;
    exchangeRate = await getExchangeRate();
    targetAmountInput.value = exchangeRate * sourceAmountInput.value;  
    targetAmountSummary.textContent = targetAmountInput.value;
}

async function targetSelectorChanged() {
    targetCurrencySummary.textContent = targetCurrencySelector.value;
    latestCurrencyTarget = targetCurrencySelector.value;
    exchangeRate = await getExchangeRate();
    targetAmountInput.value = exchangeRate * sourceAmountInput.value;
    targetAmountSummary.textContent = targetAmountInput.value;   
}

async function getExchangeRate() {
    try {
        const url = baseUrl + `/${sourceCurrencySelector.value}/${targetCurrencySelector.value}`;
        const apiResponse = await fetch(url);
        const jsonObject = await apiResponse.json(apiResponse);
        return jsonObject.rate;
    }
    catch(error) {
        console.error(error);
    }
}

function updateSummary() {

}

// function for conversion 
