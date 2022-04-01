/// <reference types="cypress" />

import {dropdownsObject} from '../../support/page_objects/DropdownsObject';

describe('Dropdowns, Checkboxes & Radio Buttons check', () => {

    beforeEach('', () => {
        cy.visit('/Dropdown-Checkboxes-RadioButtons/index.html');
    })

    it.only('Dropdown menu section check', () => {
        dropdownsObject.checkDropdownMenuSection();
    })

    it('Checkbox section check', () => {
        dropdownsObject.checkCheckboxSection();
    })

    it('Radio Button section check', () => {
        dropdownsObject.checkRadioButtonSection();
    })
})