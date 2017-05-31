'use strict';

const listBlock = document.querySelector('.list-block');

const checkboxes = Array.from(listBlock.querySelectorAll('[type="checkbox"]'));

const totalCheckboxes = checkboxes.length;

const output = listBlock.querySelector('output');

let checkedCounter = 0;

checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
        checkedCounter++;
    }
});

updateOutput();

function updateOutput() {
    output.value = `${checkedCounter} из ${totalCheckboxes}`;
    checkedCounter === totalCheckboxes ? listBlock.classList.add('complete') : listBlock.classList.remove('complete');
}

function updateCounter(checkbox) {
    checkbox.checked ? checkedCounter++ : checkedCounter--;
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        updateCounter(checkbox);
        updateOutput();
    });
});
