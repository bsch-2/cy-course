/// <reference types="cypress" />

describe('\"Contact Us\" form testing', () => {

    it('Simple form test', () => {
        cy.visit('/Contact-Us/contactus.html');
        cy.get('input[name="first_name"]').type('GOT HERE!');
        cy.get('input[name="last_name"]').type('GOT HERE!');
        cy.get('input[name="email"]').type('GOT HERE!');
        cy.get('[value="SUBMIT"]').click();
        cy.get('body').should('contain.text', 'Error: all fields are required');
        cy.get('body').should('contain.text', 'Error: Invalid email address');
    })

})