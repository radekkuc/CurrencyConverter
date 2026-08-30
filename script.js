const sourceAmountInput = document.getElementById("source-amount");
const targetAmountInput = document.getElementById("target-amount"); 

const sourceAmountSummary = document.getElementById("source-amount-summary");
const targetAmountSummary = document.getElementById("target-amount-summary");

const sourceCurrencySelector = document.getElementById("source-currency-selector");
const targetCurrencySelector = document.getElementById("target-currency-selector");

const sourceCurrencySummary = document.getElementById("source-currency-summary");
const targetCurrencySummary = document.getElementById("target-currency-summary");


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

const providedValue = 1;
const apiRate = 0.86; 
const convertedValue = providedValue * apiRate;

sourceAmountInput.value = providedValue;
targetAmountInput.value = convertedValue;

sourceAmountInput.addEventListener(
    "input",
    changeSourceInput
)

targetAmountInput.addEventListener(
    "input",
    changeTargetInput
)

function changeSourceInput() {
    console.log("Change detected");
}

function changeTargetInput() {
    console.log("Change detected");
}

function swapCurrenciesButtonClick() {
   const sourceCurrencyValue = sourceCurrencySelector.value;
   sourceCurrencySelector.value = targetCurrencySelector.value;
   targetCurrencySelector.value = sourceCurrencyValue;

   const sourceCurrencyText = sourceCurrencySummary.textContent;
   sourceCurrencySummary.textContent = targetCurrencySummary.textContent;
   targetCurrencySummary.textContent = sourceCurrencyText;  
}

// EVENT LISTENER FOR CHANGED CURRENCY SO SUMMARY CHANGES AS WELL
// 1 USD
// costs
// 0.86 EUR

    // const convertedValue = sourceAmountInput.value * apiRate;
    // const fromCurrSel = sourceCurrencySelector.value;
    // const toCurrSel = targetCurrencySelector.value;

    // targetAmountInput.value = convertedValue;

    // sourceCurrencySummary.textContent = fromCurrSel;
    // targetCurrencySummary.textContent = toCurrSel;

    // sourceAmountSummary.textContent = sourceAmountInput.value;
    // targetAmountSummary.textContent = convertedValue; 
