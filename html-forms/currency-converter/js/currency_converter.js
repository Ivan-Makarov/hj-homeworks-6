'use strict';

const loader = document.querySelector('#loader');
const content = document.querySelector('#content');
const selectors = Array.from(document.querySelectorAll('select'));
const fromField = document.querySelector('#from');
const toField = document.querySelector('#to');
const currencyAmountField = document.querySelector('#source');
const result = document.querySelector('#result');

const getRates = new XMLHttpRequest();
getRates.open('GET', 'https://neto-api.herokuapp.com/currency');
getRates.send();

getRates.addEventListener('load', () => {
    loader.classList.add('hidden');
    content.classList.remove('hidden');

    const currencies = JSON.parse(getRates.responseText);

    let optionsList = '';

    function addCurrencyOption(currency) {
        optionsList += `<option label="${currency.code}" value="${currency.value}"></option>`;
    }

    currencies.forEach(addCurrencyOption);

    function addOptionsList(selector) {
        selector.innerHTML = optionsList
    }

    function convert() {
        let currencyAmount = currencyAmountField.value;

        let fromRate = fromField.value;
        let toRate = toField.value;

        let total = (currencyAmount * fromRate / toRate);

        result.value = total.toFixed(2);
    }

    function addConvertFunction(item) {
        item.addEventListener('input', convert)
    }

    selectors.forEach(addOptionsList);
    selectors.forEach(addConvertFunction);
    addConvertFunction(currencyAmountField);
});
