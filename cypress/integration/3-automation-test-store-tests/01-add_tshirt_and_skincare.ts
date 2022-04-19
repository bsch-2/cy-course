/// <reference types="cypress" />

import { automationTestStore } from "../../support/page_objects/AutomationTestStore";

describe('When on Automation Test Store', () => {

    before(() => {
        // necessary wait for page load (to prevent site-specific bad behaviour);
        automationTestStore.pageLoadBootstrap();
    })

    beforeEach( ()=> {
        // reset cart value
        automationTestStore.cartValue = 0;
    })

    it('Add T-shirt and shoes to cart, then check cart value', () => {
            automationTestStore.addTshirt();
            automationTestStore.checkCartTotalValue(automationTestStore.cartValue);
            automationTestStore.addShoes('blue');
            automationTestStore.checkCartTotalValue(automationTestStore.cartValue);
    })

    it('Add T-shirt, shoes and skin care product to cart, then check cart value', () => {
            automationTestStore.addTshirt();
            automationTestStore.checkCartTotalValue(automationTestStore.cartValue);
            automationTestStore.addShoes('blue');
            automationTestStore.checkCartTotalValue(automationTestStore.cartValue);
            automationTestStore.addSkincareProduct();
            automationTestStore.checkCartTotalValue(automationTestStore.cartValue);
    })

    it('Add products to cart, check cart value & perform final checkout', () => {
        cy.fixture('contactFormData').then( function(contactFormData) {
            automationTestStore.addTshirt();
            automationTestStore.checkCartTotalValue(automationTestStore.cartValue);
            automationTestStore.addShoes('blue');
            automationTestStore.checkCartTotalValue(automationTestStore.cartValue);
            automationTestStore.addSkincareProduct();
            automationTestStore.checkCartTotalValue(automationTestStore.cartValue);
            automationTestStore.checkOutProduct();
            automationTestStore.validateContactForm(contactFormData);
            automationTestStore.confirmOrder();
        });
    })

})