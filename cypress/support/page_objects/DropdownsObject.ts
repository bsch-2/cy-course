/// <reference types="cypress" />

export class DropdownsObject {
    sectionLocator: string = '[class="col-sm-4 col-lg-4 col-md-4"]';
    dropdownElementLocator: string[] = [
        '#dropdowm-menu-1',
        '#dropdowm-menu-2',
        '#dropdowm-menu-3'];
    dropdownMenuElements: string[][] = [
        ["JAVA", "C#", "Python", "SQL"],
        ["Eclipse", "Maven", "TestNG", "JUnit"],
        ["HTML", "CSS", "JavaScript", "JQuery"]
    ];
    checkboxLocator: string = 'input[type="checkbox"]';

    checkDropdownMenuSection() {
        // to be changed to iterator
        this.selectSection(0)
            .find(this.dropdownElementLocator[0])
            .then(dropdown => {
                this.dropDownIterator(dropdown, 0);
            });
        this.selectSection(0)
            .find(this.dropdownElementLocator[1])
            .then(dropdown => {
                this.dropDownIterator(dropdown, 1);
            });
        this.selectSection(0)
            .find(this.dropdownElementLocator[2])
            .then(dropdown => {
                this.dropDownIterator(dropdown, 2);
            });
    }

    dropDownIterator(dropdown, listItemRange) {
        let index: number = 0;
        for (index; index < this.dropdownMenuElements[listItemRange].length; index++) {
            cy.wrap(dropdown).select(index).should('contain.text', this.dropdownMenuElements[listItemRange][index])
        }
    }

    checkCheckboxSection() {
        this.selectSection(1)
            .then(checkboxes => {
                this.checkboxSelection();
            });
    }

    checkboxSelection() {
        cy.get(this.checkboxLocator).check().should('be.checked');
        cy.get(this.checkboxLocator).eq(1).uncheck().should('not.be.checked');
        cy.get(this.checkboxLocator).eq(3).uncheck().should('not.be.checked');
    }

    checkRadioButtonSection() {
        this.selectSection(2)
            .find('[type="radio"]')
            .check().should('be.checked');
    }

    selectSection(index) {
        return cy.get(this.sectionLocator).eq(index);
    }
}

export const dropdownsObject = new DropdownsObject();