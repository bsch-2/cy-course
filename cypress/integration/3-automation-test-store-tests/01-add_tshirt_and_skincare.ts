/// <reference types="cypress" />

import {automationTestStore} from "../../support/page_objects/AutomationTestStore";

describe('When on Automation Test Store', () => {

    beforeEach(() => {
        automationTestStore.pageLoadBootstrap();
    })

    it('Add T-shirt to cart and skincare product to cart', () => {
        automationTestStore.addTshirt();
        automationTestStore.addSkincareProduct();
        automationTestStore.checkOutProduct();
    })

})