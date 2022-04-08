/// <reference types="cypress" />

import {dropdownsObject} from '../../support/page_objects/Dropdowns';

describe('Dropdowns, Checkboxes & Radio Buttons check', () => {

    beforeEach('', () => {
        cy.visit('/Dropdown-Checkboxes-RadioButtons/index.html');
    })

    it('Dropdown menu section check', () => {
        dropdownsObject.checkDropdownMenuSection();
    })

    it('Checkbox section check', () => {
        dropdownsObject.checkCheckboxSection();
    })

    it.only('Radio Button section check', () => {
        dropdownsObject.radioButtons();
    })
})