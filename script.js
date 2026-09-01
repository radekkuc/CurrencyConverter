const sourceAmountInput = document.getElementById("source-amount");
const targetAmountInput = document.getElementById("target-amount"); 

const sourceAmountSummary = document.getElementById("source-amount-summary");
const targetAmountSummary = document.getElementById("target-amount-summary");

const sourceCurrencySelector = document.getElementById("source-currency-selector");
const targetCurrencySelector = document.getElementById("target-currency-selector");

const sourceCurrencySummary = document.getElementById("source-currency-summary");
const targetCurrencySummary = document.getElementById("target-currency-summary");

const swapCurrenciesButton = document.getElementById("swap-currencies-button");


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
sourceCurrencySelector.value = "USD";
targetCurrencySelector.value = "EUR";

sourceCurrencySelector.addEventListener("change", () => {
    sourceCurrencySummary.textContent = sourceCurrencySelector.value;
});

targetCurrencySelector.addEventListener( "change", () => {
    targetCurrencySummary.textContent = targetCurrencySelector.value;
});

swapCurrenciesButton.addEventListener("click", swapCurrenciesButtonClick);

sourceAmountInput.addEventListener("input", () => {
    targetAmountInput.value = sourceAmountInput.valueAsNumber * apiRate;
    sourceAmountSummary.textContent = sourceAmountInput.value;
    targetAmountSummary.textContent = targetAmountInput.value;
});

targetAmountInput.addEventListener("input", () => {
    sourceAmountInput.value = targetAmountInput.valueAsNumber / apiRate;
    targetAmountSummary.textContent = targetAmountInput.value;
    sourceAmountSummary.textContent = sourceAmountInput.value; 
});

function swapCurrenciesButtonClick() {
   const sourceCurrencyValue = sourceCurrencySelector.value;
   sourceCurrencySelector.value = targetCurrencySelector.value;
   targetCurrencySelector.value = sourceCurrencyValue;

   const sourceCurrencyText = sourceCurrencySummary.textContent;
   sourceCurrencySummary.textContent = targetCurrencySummary.textContent;
   targetCurrencySummary.textContent = sourceCurrencyText;  
}
