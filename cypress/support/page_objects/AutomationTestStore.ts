/// <reference types="cypress" />

interface MenuSection {
    [key: string]: string;
}

export class AutomationTestStore {
    menuBarLocator: string = '#categorymenu';
    priceTagLocator: string = '[class="pricetag jumbotron"]';
    menuSectionName: MenuSection = {
        "Apparel & accessories": "Apparel & accessories",
    }


    //necessary; otherwise simple visit will not wait for the last post request to finish and causes weird app behaviour
    pageLoadBootstrap() {
        cy.visit('https://automationteststore.com/')
        cy.intercept('/users/event/visit_url').as('visitUrl')
        cy.wait('@visitUrl')
    }

    //locator functions
    getMenuSection(menuSection: string) {
        return cy.get(this.menuBarLocator).find('li').contains(menuSection);
    }

    getHoverMenu(menuSection: string) {
        return this.getMenuSection(menuSection).parent().find('.subcategories').invoke('show');
    }

    addTshirt() {
        this.getHoverMenu(this.menuSectionName["Apparel & accessories"]).invoke('css', 'display: block').contains('T-shirts').click();
        cy.get(this.priceTagLocator).find('.productcart').not('.nostock').eq(0).click();
    }
}

export const automationTestStore = new AutomationTestStore()