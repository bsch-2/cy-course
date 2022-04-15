/// <reference types="cypress" />

interface MenuSection {
    [key: string]: string;
}

export class AutomationTestStore {
    // general locators
    menuBarLocator: string = '#categorymenu';
    priceTagLocator: string = '[class="pricetag jumbotron"]';
    productCartLocator: string = '.productcart';
    tshirtSizeMenuLocator: string = '#option353';
    tshirtSizeMenuItemLocator: number = 5;
    addToCartButtonLocator: string = '.productpagecart';
    shoppingCartItemCountLocator: string = '[class="label label-orange font14"]';

    // search bar locators
    searchBarLocator: string = '#filter_keyword';
    searchBarSearchButtonLocator: string = '.button-in-search';
    searchPhrase: string = 'Skin Minerals For Men Cleansing Cream';

    // cart locators
    cartButtonLocator: string = '[class="nav topcart pull-left"]';
    cartCheckoutButtonLocator: string = '#cart_checkout1';

    // checkout locators
    guestRadioButtonLocator: string = '#accountFrm_accountguest';
    continueButtonLocator: string = '[type="submit"]';

    // checkout form locators
    mandatoryIndicatorLocator: string = '[class="input-group-addon"]';

    // input name list
    contactFormInputFields = {
        "firstName" : "firstname",
        "lastName": "lastname",
        "email": "email",
        "telephone": "telephone",
        "fax": "fax",
        "company": "company",
        "address_1": "address_1",
        "address_2": "address_2",
        "city": "city",
        "zone_id": "zone_id",
        "postcode": "postcode",
        "country_id": "country_id",
    }

    contactFormInputData = {
        valid : {
            "firstName" : "John",
            "lastName": "Connor",
            "email": "john.connor@mail.com",
            "telephone": "500300200",
            "fax": "500300200",
            "company": "Skynet",
            "address_1": "Somewhere",
            "address_2": "Over the Rainbow",
            "city": "Neotokio 3",
            "zone_id": "Aberdeen",
            "postcode": "00000",
            "country_id": "Togo",
        }
    }


    menuSectionName: MenuSection = {
        "Apparel & accessories": "Apparel & accessories",
        "Skincare": "Skincare"
    }

    // necessary; otherwise simple visit will not wait for the last post request to finish and causes weird app behaviour
    pageLoadBootstrap() {
        cy.visit('https://automationteststore.com/')
        cy.intercept('/users/event/visit_url').as('visitUrl')
        cy.wait('@visitUrl')
    }

    // locator functions
    getMenuSection(menuSection: string) {
        return cy.get(this.menuBarLocator).find('li').contains(menuSection);
    }

    getHoverMenu(menuSection: string) {
        return this.getMenuSection(menuSection).parent().find('.subcategories').invoke('show');
    }

    getContactFormInputField(inputFieldName: string, isDropdown: boolean){
        if(isDropdown){
            return cy.get('.form-group')
                .find(`[name="${inputFieldName}"]`)
        } else {
            return cy.get('.form-group')
                .find(`input[name="${inputFieldName}"]`)
        }
    }

    // main methods
    addTshirt() {
        this.getHoverMenu(this.menuSectionName["Apparel & accessories"])
            .invoke('css', 'display: block')
            .contains('T-shirts')
            .click();
        this.addProductToCart(1);
        cy.get(this.tshirtSizeMenuLocator)
            .select(this.tshirtSizeMenuItemLocator);
        cy.get(this.addToCartButtonLocator)
            .click();
        this.checkNumberOfItemsInCart(1);
    }

    addSkincareProduct(){
        this.searchForProduct(this.searchPhrase);
        this.addProductToCart(3);
        this.checkNumberOfItemsInCart(2);
    }

    checkOutProduct(){
        this.openCart();
        cy.get(this.cartCheckoutButtonLocator)
            .click();
        cy.get(this.guestRadioButtonLocator)
            .check()
            .should('be.checked');
        cy.get(this.continueButtonLocator)
            .contains('Continue')
            .click()
            .url()
            .should('include', 'checkout/guest_step_1');
        this.validateContactForm();
    }

    validateContactForm(){
        // todo - change to iterator

        this.getContactFormInputField(this.contactFormInputFields['firstName'], false).type(this.contactFormInputData.valid["firstName"]);
        this.getContactFormInputField(this.contactFormInputFields['lastName'], false).type(this.contactFormInputData.valid["lastName"]);
        this.getContactFormInputField(this.contactFormInputFields['email'], false).type(this.contactFormInputData.valid["email"]);
        this.getContactFormInputField(this.contactFormInputFields['telephone'], false).type(this.contactFormInputData.valid["telephone"]);
        this.getContactFormInputField(this.contactFormInputFields['fax'], false).type(this.contactFormInputData.valid["fax"]);
        this.getContactFormInputField(this.contactFormInputFields['company'], false).type(this.contactFormInputData.valid["company"]);
        this.getContactFormInputField(this.contactFormInputFields['address_1'], false).type(this.contactFormInputData.valid["address_1"]);
        this.getContactFormInputField(this.contactFormInputFields['address_2'], false).type(this.contactFormInputData.valid["address_2"]);
        this.getContactFormInputField(this.contactFormInputFields['city'], false).type(this.contactFormInputData.valid["city"]);
        this.getContactFormInputField(this.contactFormInputFields['zone_id'], true).select(this.contactFormInputData.valid["zone_id"]);
        this.getContactFormInputField(this.contactFormInputFields['postcode'], false).type(this.contactFormInputData.valid["postcode"]);
        this.getContactFormInputField(this.contactFormInputFields['country_id'], true).select(this.contactFormInputData.valid["country_id"]);

        cy.get(this.continueButtonLocator)
            .contains('Continue')
            .click();

    }

    // helper methods
    checkNumberOfItemsInCart(numberOfItemsInCart:number){
        cy.get(this.shoppingCartItemCountLocator)
            .should('contain.text', numberOfItemsInCart)
    }

    searchForProduct(searchPhrase: string) {
        cy.get(this.searchBarLocator)
            .type(searchPhrase)
            .get(this.searchBarSearchButtonLocator)
            .click()
    }

    addProductToCart(index: number) {
        cy.get(this.priceTagLocator)
            .find(this.productCartLocator)
            .not('.nostock')
            .eq(index)
            .click();
    }

    openCart(){
        cy.get(this.cartButtonLocator).click();
    }
}

export const automationTestStore = new AutomationTestStore()