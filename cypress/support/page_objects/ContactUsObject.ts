/// <reference types="cypress" />

export class ContactUsObject {
    firstNameLocator = 'input[name="first_name"]';
    lastNameLocator = 'input[name="last_name"]';
    emailLocator = 'input[name="email"]';
    commentLocator = 'textarea[name="message"]';
    submitButtonLocator = '[type="submit"]';
    resetButtonLocator: string = '[type="reset"]';
    errorMessage: string[] = [
        'Error: all fields are required',
        'Error: Invalid email address'
    ]
    confirmationMessage: string = 'Thank You for your Message!';

    writeFirstName(firstName) {
        cy.get(this.firstNameLocator).type(firstName);
    };

    writeLastName(lastName) {
        cy.get(this.lastNameLocator).type(lastName);
    };

    writeEmail(email) {
        cy.get(this.emailLocator).type(email);
    };

    writeComment(comment) {
        cy.get(this.commentLocator).type(comment);
    };

    formSubmit() {
        cy.get('#form_buttons').find(this.submitButtonLocator).click();
    }

    formReset() {
        cy.get('#form_buttons').find(this.resetButtonLocator).click();
    }

    fillForm(firstName?: string, lastName?: string, email?: string, comment?: string) {
        if (firstName != undefined) {
            contactUsPage.writeFirstName(firstName);
        }
        if (lastName != undefined) {
            contactUsPage.writeLastName(lastName);
        }
        if (email != undefined) {
            contactUsPage.writeEmail(email);
        }
        if (email != undefined) {
            contactUsPage.writeComment(comment);
        }
    }

    checkForm(isEmpty) {
        if (isEmpty) {
            cy.get(this.firstNameLocator).should('be.empty');
            cy.get(this.lastNameLocator).should('be.empty');
            cy.get(this.emailLocator).should('be.empty');
            cy.get(this.commentLocator).should('be.empty');
        }
    }

    checkFormConfirmationMessage() {
        cy.get('#contact_reply').should('contain.text', this.confirmationMessage);
    }

    validationErrorCheck(isFormIncomplete?: boolean, isEmailInvalid?: boolean) {
        if (isFormIncomplete) {
            cy.get('body').should('contain.text', this.errorMessage[0]);
        }
        if (isEmailInvalid) {
            cy.get('body').should('contain.text', this.errorMessage[1]);
        }
    }
}

export const contactUsPage = new ContactUsObject();