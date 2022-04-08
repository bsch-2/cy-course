/// <reference types="cypress" />

import {automationTestStore} from "../../support/page_objects/AutomationTestStore";

describe('Add T-shirt and cosmetic product', () => {

    beforeEach(() => {
        automationTestStore.pageLoadBootstrap();
    })

    it('Add T-shirt', () => {
        automationTestStore.addTshirt();
    })

})