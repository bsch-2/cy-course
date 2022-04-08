/// <reference types="cypress" />

import {ajaxLoader} from '../../support/page_objects/AjaxLoader';

describe('Autocomplete TextField check', () => {

    beforeEach('', () => {
        cy.visit('/Ajax-Loader/index.html');
    })

    it('Ajax loader check', () => {
        ajaxLoader.clickMeButtonWait();
    })
})