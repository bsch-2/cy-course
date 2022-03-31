/// <reference types="cypress" />

import {contactUsPage} from '../../support/page_objects/ContactUsObject';

describe('\"Contact Us\" form testing', () => {

    beforeEach('', () => {
        cy.visit('/Contact-Us/contactus.html');
    })

    it('Fill form, reset & check if form is clear', () => {
        contactUsPage.fillForm('First Name', 'Last Name', 'test.email@mail.com', 'Some different comment');
        contactUsPage.formReset();
        contactUsPage.checkForm(true);
    })

    it('Fill part of form, send & check if error message is correct', () => {
        contactUsPage.fillForm('First Name', 'Last Name');
        contactUsPage.formSubmit();
        contactUsPage.validationErrorCheck(true);
    })

    it('Enter bad email, send & check if error message is correct', () => {
        contactUsPage.fillForm('First Name', 'Last Name', 'badEmail', 'This is a comment');
        contactUsPage.formSubmit();
        contactUsPage.validationErrorCheck(false, true);
    })

    it('Fill form, send & check if message is correct', () => {
        contactUsPage.fillForm('First Name', 'Last Name', 'test.email@mail.com', 'Some different comment');
        contactUsPage.formSubmit();
        contactUsPage.checkFormConfirmationMessage();
    })

})