/// <reference types="cypress" />

import {datepickerObject} from '../../support/page_objects/Datepicker';

describe('When on Datepicker page', () => {
    const dayOffset = 50;

    beforeEach('', () => {
        cy.visit('/Datepicker/index.html');
    })

    it(`Select the date and check if input field displays date that is ${dayOffset} days from today\'s date`, () => {
        datepickerObject.pickDate(dayOffset);
    })
})