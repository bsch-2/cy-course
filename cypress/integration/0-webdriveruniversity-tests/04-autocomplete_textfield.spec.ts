/// <reference types="cypress" />

import {autocompleteObject} from '../../support/page_objects/AutocompleteObject';

describe('Autocomplete TextField check', () => {
    const foodName = 'Chi';

    beforeEach('Visit autocomplete page', () => {
        cy.visit('/Autocomplete-TextField/autocomplete-textfield.html');
    })

    it('Autocomplete check', () => {
        autocompleteObject.typeFoodName(foodName);
        autocompleteObject.autocompleteList();
        autocompleteObject.submitButton().click();
    })
})