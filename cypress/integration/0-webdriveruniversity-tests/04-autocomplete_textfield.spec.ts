/// <reference types="cypress" />

import {autocompleteObject} from '../../support/page_objects/Autocomplete';

describe('When on Autocomplete TextField page', () => {
    const foodName = 'Chi';

    beforeEach('Visit autocomplete page', () => {
        cy.visit('/Autocomplete-TextField/autocomplete-textfield.html');
    })

    it('Type in part of food name, and pick food from autocomplete list', () => {
        autocompleteObject.typeFoodName(foodName);
        autocompleteObject.autocompleteList();
        autocompleteObject.submitButton().click();
    })
})