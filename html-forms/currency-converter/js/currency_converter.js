'use strict';

const loader = document.querySelector('#loader');
const content = document.querySelector('#content');
const fromBox = document.querySelector('#from');
const toBox = document.querySelector('#to');

const getRates = new XMLHttpRequest();
getRates.open('GET', 'https://neto-api.herokuapp.com/currency');
getRates.send();

getRates.addEventListener('load', () => {
    loader.classList.add('hidden');
    content.classList.remove('hidden');

    const currencies = JSON.parse(getRates.responseText);

    currencies.forEach(currency => {
        let currencyListOption = '<option>' + currency.code + '</option>';

        fromBox.innerHTML += currencyListOption;

        toBox.innerHTML += currencyListOption;
    })
});
