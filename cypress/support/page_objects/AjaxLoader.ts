/// <reference types="cypress" />

export class AjaxLoader {
    clickMeButton: string = '#myDiv';

    clickMeButtonWait() {
        cy.get(this.clickMeButton).click({timeout: 10000});
    }
}

export const ajaxLoader = new AjaxLoader();