/// <reference types="cypress" />


interface MenuSection {
    [key: string]: string;
}

export class AutomationTestStore {
    // general locators
    menuBarLocator: string = '#categorymenu';
    priceTagLocator: string = '[class="pricetag jumbotron"]';
    productNameLocator: string = '[class="fixed_wrapper"]';
    totalPriceLocator: string = '[class="bold totalamout"]';
    productCartLocator: string = '.productcart';
    tshirtSizeMenuLocator: string = '#option351';
    tshirtSizeMenuItemLocator: number = 1;
    addToCartButtonLocator: string = '.productpagecart';
    shoppingCartItemCountLocator: string = '[class="label label-orange font14"]';

    // search bar locators
    searchBarLocator: string = '#filter_keyword';
    searchBarSearchButtonLocator: string = '.button-in-search';
    searchPhrase: string = 'Skin Minerals For Men Cleansing Cream';

    // cart locators
    cartButtonLocator: string = '[class="nav topcart pull-left"]';
    cartCheckoutButtonLocator: string = '#cart_checkout1';
    finalCheckoutButtonLocator: string = '#checkout_btn';
    successTextLocator: string = '.maintext';
    successText: string = ' Your Order Has Been Processed!';

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

    menuSectionName: MenuSection = {
        "Apparel & accessories": "Apparel & accessories",
        "Skincare": "Skincare"
    }

    // cart values & prices
    tshirtPrice: number = 32;
    shoePrice: number = 26;
    skincareProductPrice: number = 104;
    flatShippingRate: number = 2;
    cartValue: number = 0;

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
        this.cartValue += this.tshirtPrice;

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

    addShoes(colour: string) {
        this.cartValue += this.shoePrice;

        this.getHoverMenu(this.menuSectionName["Apparel & accessories"])
            .invoke('css', 'display: block')
            .contains('Shoes')
            .click();
        this.addProductToCart(1);
        cy.get('label')
            .contains(colour)
            .find('input')
            .check()
            .should('be.checked');
        cy.get(this.addToCartButtonLocator)
            .click();
        this.checkNumberOfItemsInCart(2);
    }

    addSkincareProduct(){
        this.cartValue += this.skincareProductPrice;

        this.searchForProduct(this.searchPhrase);
        // selection by cart icon doesn't work for this item, have to select by heading/title
        cy.get(this.productNameLocator)
            .contains(this.searchPhrase)
            .click();

        cy.get(this.addToCartButtonLocator)
            .click();

        this.checkNumberOfItemsInCart(3);
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
    }

    validateContactForm(contactFormDataJSON){
        // todo - change to iterator

        this.getContactFormInputField(this.contactFormInputFields['firstName'], false).type(contactFormDataJSON.valid["firstName"]);
        this.getContactFormInputField(this.contactFormInputFields['lastName'], false).type(contactFormDataJSON.valid["lastName"]);
        this.getContactFormInputField(this.contactFormInputFields['email'], false).type(contactFormDataJSON.valid["email"]);
        this.getContactFormInputField(this.contactFormInputFields['telephone'], false).type(contactFormDataJSON.valid["telephone"]);
        this.getContactFormInputField(this.contactFormInputFields['fax'], false).type(contactFormDataJSON.valid["fax"]);
        this.getContactFormInputField(this.contactFormInputFields['company'], false).type(contactFormDataJSON.valid["company"]);
        this.getContactFormInputField(this.contactFormInputFields['address_1'], false).type(contactFormDataJSON.valid["address_1"]);
        this.getContactFormInputField(this.contactFormInputFields['address_2'], false).type(contactFormDataJSON.valid["address_2"]);
        this.getContactFormInputField(this.contactFormInputFields['city'], false).type(contactFormDataJSON.valid["city"]);
        this.getContactFormInputField(this.contactFormInputFields['zone_id'], true).select(contactFormDataJSON.valid["zone_id"]);
        this.getContactFormInputField(this.contactFormInputFields['postcode'], false).type(contactFormDataJSON.valid["postcode"]);
        this.getContactFormInputField(this.contactFormInputFields['country_id'], true).select(contactFormDataJSON.valid["country_id"]);

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
            .click( { force: true })
    }

    addProductToCart(itemFromList: number) {
        cy.get(this.priceTagLocator)
            .find(this.productCartLocator)
            .not('.nostock')
            .eq(itemFromList)
            .click();
    }

    openCart(){
        cy.get(this.cartButtonLocator).click();
    }

    checkCartTotalValue(totalCartValue) {
        totalCartValue += this.flatShippingRate;

        cy.get(this.totalPriceLocator)
            .should('have.text', `$${totalCartValue}.00`);
    }

    confirmOrder() {
        cy.get(this.finalCheckoutButtonLocator)
            .click();
        cy.url()
            .should('include', 'checkout/success');
        cy.get(this.successTextLocator)
            .should('have.text', this.successText)
    }
}

export const automationTestStore = new AutomationTestStore()