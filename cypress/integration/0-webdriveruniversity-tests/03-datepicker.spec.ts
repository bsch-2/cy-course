/// <reference types="cypress" />

import {datepickerObject} from '../../support/page_objects/DatepickerObject';

describe('Datepicker check', () => {

    beforeEach('', () => {
        cy.visit('/Datepicker/index.html');
    })

    it('Datepicker check', () => {
        datepickerObject.datePicker();
    })
})