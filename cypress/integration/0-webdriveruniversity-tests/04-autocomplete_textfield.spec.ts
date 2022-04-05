/// <reference types="cypress" />

import {autocompleteObject} from '../../support/page_objects/AutocompleteObject';

describe('Autocomplete TextField check', () => {

    beforeEach('', () => {
        cy.visit('/Autocomplete-TextField/autocomplete-textfield.html');
    })

    it('Autocomplete check', () => {
        autocompleteObject.typeFoodName('Chi');
        autocompleteObject.autocompleteList();
        autocompleteObject.submitButton().click();
    })
})