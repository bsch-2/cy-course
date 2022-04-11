/// <reference types="cypress" />

import {dropdownsObject} from '../../support/page_objects/Dropdowns';

describe('When in Dropdown Menu(s) section', () => {

    beforeEach('', () => {
        cy.visit('/Dropdown-Checkboxes-RadioButtons/index.html');
    })

    it('Each list should have correct length', () => {
        dropdownsObject.checkEachListLength();
    })

    it('Each list should have correct elements', () => {
        dropdownsObject.checkListElements();
    })
})

describe('When in Checkboxe(s) section', () => {
    it('When one checkbox is clicked, it should be checked', () => {
        dropdownsObject.checkCheckboxSection();
    })
})

describe('When in Radio Button(s) section', () => {
    it('When radio button is clicked, it becomes checked and other radio buttons are unchecked', () => {
        dropdownsObject.radioButtons();
    })
})