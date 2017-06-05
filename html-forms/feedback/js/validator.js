'use strict';

const inputs = Array.from(document.querySelectorAll('input'));
const textareas = Array.from(document.querySelectorAll('textarea'));
const fields = inputs.concat(textareas);
const buttons = Array.from(document.querySelectorAll('button'));
const zip = document.querySelector('[name="zip"]');
const form = document.querySelector('form');
const userMessage = document.querySelector('#output');
const outputs = Array.from(userMessage.querySelectorAll('output'));
const sendMessageButton = buttons[0];
const changeMessageButton = buttons[1];

function isFilled(input) {
    if (input.value) {
        return true;
    } else {
        return false;
    }
}

function areAllFilled() {
    let allFilled = true;

    function checkField(field) {
        if (!isFilled(field)) {
            allFilled = false;
        }
    }

    fields.forEach(checkField);
    return allFilled;
}

function activateSubmitButton() {
    if (areAllFilled()) {
        sendMessageButton.disabled = false;
    }
}

function addSubmitActivator(field) {
    field.addEventListener('input', activateSubmitButton);
}

fields.forEach(addSubmitActivator);

function allowOnlyNumbers() {
    var value = this.value;
    var rep = /[-\.;":'a-zA-Zа-яА-Я]/;
    if (rep.test(value)) {
        value = value.replace(rep, '');
        this.value = value;
    }
}

zip.addEventListener('input', allowOnlyNumbers)

function hide(block) {
    block.classList.add('hidden')
}

function show(block) {
    block.classList.remove('hidden')
}

function showUserMessage() {
    hide(form);
    show(userMessage);

    function findMatchingField(outputItem) {
        function isMatching(field) {
            return field.name === outputItem.id;
        }
        let matchingField = fields.find(isMatching);
        outputItem.value = matchingField.value;
    }

    outputs.forEach(findMatchingField)
}

function showForm() {
    hide(userMessage);
    show(form);
}

sendMessageButton.addEventListener('click', (click) => {
    click.preventDefault();
    showUserMessage();
});

changeMessageButton.addEventListener('click', (click) => {
    click.preventDefault();
    showForm();
});
