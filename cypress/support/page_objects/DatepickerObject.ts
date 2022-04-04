/// <reference types="cypress" />

export class DatepickerObject {

    datePicker() {
        cy.get('#datepicker')
            .find('input')
            .then(input => {
                cy.wrap(input).click();
                cy.get('[class="day"]').contains('1').click();
                cy.wrap(input).invoke('prop', 'value').should('contain', '04-01-2022');
            });
    }
}

export const datepickerObject = new DatepickerObject();