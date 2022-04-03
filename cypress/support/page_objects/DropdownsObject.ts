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

    //checkbox section

    checkCheckboxSection() {
        this.selectSection(1)
            .then(checkboxes => {
                for (let i: number = 0; i <= 3; i++) {
                    this.checkboxSelection(i, true);
                }
                this.checkboxSelection(1, false);
                this.checkboxSelection(3, false);
            });
    }

    checkboxSelection(checkboxRange: number, isChecked: boolean) {
        if (isChecked) {
            cy.get(this.checkboxLocator).eq(checkboxRange).check().should('be.checked');
        } else {
            cy.get(this.checkboxLocator).eq(checkboxRange).uncheck().should('not.be.checked');
        }
    }

    // radio button section

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