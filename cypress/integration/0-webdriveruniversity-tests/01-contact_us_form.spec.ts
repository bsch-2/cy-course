/// <reference types="cypress" />

import {contactUsPage} from '../../support/page_objects/ContactUs';

describe('\"Contact Us\" form testing', () => {
    const correctUserData = {
        "FirstName": "John",
        "LastName": "Connor",
        "Email": "john.connor@mail.com",
        "Comment": "Some different comment"
    };
    const notCorrectUserData = {
        "FirstName": "@",
        "LastName": "!",
        "Email": "badEmail",
        "Comment": " "
    };


    beforeEach('', () => {
        cy.visit('/Contact-Us/contactus.html');
    })

    it('Fill form, reset & check if form is clear', () => {
        contactUsPage.fillForm(
            correctUserData.FirstName,
            correctUserData.LastName,
            correctUserData.Email,
            correctUserData.Comment
        );
        contactUsPage.formReset();
        contactUsPage.checkForm(true);
    })

    it('Fill part of form, send & check if error message is correct', () => {
        contactUsPage.fillForm(
            correctUserData.FirstName,
            correctUserData.LastName
        );
        contactUsPage.formSubmit();
        contactUsPage.validationErrorCheck(true);
    })

    it('Enter bad email, send & check if error message is correct', () => {
        contactUsPage.fillForm(
            correctUserData.FirstName,
            correctUserData.LastName,
            notCorrectUserData.Email,
            correctUserData.Comment
        );
        contactUsPage.formSubmit();
        contactUsPage.validationErrorCheck(false, true);
    })

    it('Fill form, send & check if message is correct', () => {
        contactUsPage.fillForm(
            correctUserData.FirstName,
            correctUserData.LastName,
            correctUserData.Email,
            correctUserData.Comment
        );
        contactUsPage.formSubmit();
        contactUsPage.checkFormConfirmationMessage();
    })

})