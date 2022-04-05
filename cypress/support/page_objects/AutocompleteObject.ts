/// <reference types="cypress" />

export class AutocompleteObject {


    typeFoodName(text: string) {
        this.foodNameInputField().type(text);
        this.foodNameInputConfirm(text);
    }

    foodNameInputConfirm(text: string) {
        return this.foodNameInputField().invoke('prop', 'value').should('contain', text);
    }

    foodNameInputField() {
        return cy.get('#myInput');
    }

    submitButton() {
        return cy.get('#submit-button');
    }

    autocompleteList() {
        cy.get('#myInputautocomplete-list')
            .find('div')
            .eq(1)
            .click();
    }

}

export const autocompleteObject = new AutocompleteObject();