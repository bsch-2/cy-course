/// <reference types="cypress" />

export class Autocomplete {
    submitButtonLocator: string = '#submit-button';
    foodNameInputLocator: string = '#myInput';
    autocompleteListLocator: string = '#myInputautocomplete-list';

    typeFoodName(text: string) {
        this.foodNameInputField().type(text);
        this.foodNameInputConfirm(text);
    }

    foodNameInputConfirm(text: string) {
        return this.foodNameInputField().invoke('prop', 'value').should('contain', text);
    }

    foodNameInputField() {
        return cy.get(this.foodNameInputLocator);
    }

    submitButton() {
        return cy.get(this.submitButtonLocator);
    }

    autocompleteList() {
        cy.get(this.autocompleteListLocator)
            .find('div')
            .eq(1)
            .click();
    }

}

export const autocompleteObject = new Autocomplete();