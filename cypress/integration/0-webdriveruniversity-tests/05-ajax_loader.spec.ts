/// <reference types="cypress" />

import {ajaxLoader} from '../../support/page_objects/AjaxLoader';

describe('When on Ajax Loader page', () => {

    beforeEach('', () => {
        cy.visit('/Ajax-Loader/index.html');
    })

    it('Wait for \'Click Me\' button to appear, and click on it', () => {
        ajaxLoader.clickMeButtonWait();
    })
})