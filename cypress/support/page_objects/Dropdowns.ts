/// <reference types="cypress" />

interface SectionNames {
    [key: string]: number;
}

export class Dropdowns {
    amountOfRadioButtons: number = 5;
    sectionName = {
        Dropdowns: 0,
        Checkboxes: 1,
        Radiobuttons: 2,
    };
    sectionLocator: string = '[class="col-sm-4 col-lg-4 col-md-4"]';
    dropdownElementLocator: string[] = [
        '#dropdowm-menu-1',
        '#dropdowm-menu-2',
        '#dropdowm-menu-3',
    ];
    dropdownMenuElements: string[][] = [
        ['JAVA', 'C#', 'Python', 'SQL'],
        ['Eclipse', 'Maven', 'TestNG', 'JUnit'],
        ['HTML', 'CSS', 'JavaScript', 'JQuery'],
    ];
    checkboxLocator: string = 'input[type="checkbox"]';

    checkDropdownMenuSection() {
        // to be changed to iterator
        this.selectSection(this.sectionName['Dropdowns'])
            .find(this.dropdownElementLocator[0])
            .then((dropdown) => {
                this.dropDownIterator(dropdown, 0);
            });
        this.selectSection(this.sectionName['Dropdowns'])
            .find(this.dropdownElementLocator[1])
            .then((dropdown) => {
                this.dropDownIterator(dropdown, 1);
            });
        this.selectSection(this.sectionName['Dropdowns'])
            .find(this.dropdownElementLocator[2])
            .then((dropdown) => {
                this.dropDownIterator(dropdown, 2);
            });
    }

    dropDownIterator(dropdown, listItemRange: number) {
        let index: number = 0;
        for (
            index;
            index < this.dropdownMenuElements[listItemRange].length;
            index++
        ) {
            cy.wrap(dropdown)
                .select(index)
                .should(
                    'contain.text',
                    this.dropdownMenuElements[listItemRange][index]
                );
        }
    }

    //checkbox section

    checkCheckboxSection() {
        this.selectSection(1).then((checkboxes) => {
            for (let i: number = 0; i <= 3; i++) {
                this.checkboxSelection(i, true);
            }
            this.checkboxSelection(1, false);
            this.checkboxSelection(3, false);
        });
    }

    checkboxSelection(checkboxRange: number, isChecked: boolean) {
        if (isChecked) {
            cy.get(this.checkboxLocator)
                .eq(checkboxRange)
                .check()
                .should('be.checked');
        } else {
            cy.get(this.checkboxLocator)
                .eq(checkboxRange)
                .uncheck()
                .should('not.be.checked');
        }
    }

    // radio button section

    radioButtons() {
        // check each radio button and check if others are unchecked at the same time
        for (
            let index: number = 0;
            index < this.amountOfRadioButtons;
            index++
        ) {
            this.clickRadioButton(this.sectionName['Radiobuttons'], index);
        }
    }

    clickRadioButton(section: number, range: number) {
        // check chosen radio button & assert if that was done
        this.selectSection(section)
            .find('[type="radio"]')
            .eq(range)
            .check()
            .should('be.checked');
        // confirm that other radio buttons are unchecked after first one was checked
        this.checkUncheckedRatioButtons(section, range);
    }

    checkUncheckedRatioButtons(section: number, skippedRadioButton: number) {
        for (
            let index: number = 0;
            index < this.amountOfRadioButtons;
            index++
        ) {
            // skip chosen radio button
            if (skippedRadioButton != index) {
                this.selectSection(section)
                    .find('[type="radio"]')
                    .eq(index)
                    .should('not.be.checked');
            }
        }
    }

    // helper functions

    selectSection(index: number) {
        return cy.get(this.sectionLocator).eq(index);
    }
}

export const dropdownsObject = new Dropdowns();
