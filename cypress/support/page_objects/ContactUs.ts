/// <reference types="cypress" />

export class ContactUs {
    firstNameLocator: string = 'input[name="first_name"]';
    lastNameLocator: string = 'input[name="last_name"]';
    emailLocator: string = 'input[name="email"]';
    commentLocator: string = 'textarea[name="message"]';
    submitButtonLocator: string = '[type="submit"]';
    resetButtonLocator: string = '[type="reset"]';
    formButtonLocator: string = '#form_buttons';
    replyLocator: string = '#contact_reply';
    confirmationMessage: string = 'Thank You for your Message!';
    errorMessage: string[] = [
        'Error: all fields are required',
        'Error: Invalid email address'
    ]

    writeFirstName(firstName: string) {
        return cy.get(this.firstNameLocator).type(firstName);
    };

    writeLastName(lastName: string) {
        return cy.get(this.lastNameLocator).type(lastName);
    };

    writeEmail(email: string) {
        return cy.get(this.emailLocator).type(email);
    };

    writeComment(comment: string) {
        return cy.get(this.commentLocator).type(comment);
    };

    formSubmit() {
        return cy.get(this.formButtonLocator).find(this.submitButtonLocator).click();
    }

    formReset() {
        return cy.get(this.formButtonLocator).find(this.resetButtonLocator).click();
    }

    // refactor to remove ?:
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

    checkForm(isEmpty: boolean) {
        if (isEmpty) {
            cy.get(this.firstNameLocator).should('be.empty');
            cy.get(this.lastNameLocator).should('be.empty');
            cy.get(this.emailLocator).should('be.empty');
            cy.get(this.commentLocator).should('be.empty');
        }
    }

    checkFormConfirmationMessage() {
        cy.get(this.replyLocator).should('contain.text', this.confirmationMessage);
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

export const contactUsPage = new ContactUs();