/// <reference types="cypress" />

export class Dropdowns {
	amountOfRadioButtons: number = 5;
	sectionLocator: string = '[class="col-sm-4 col-lg-4 col-md-4"]';
	checkboxLocator: string = 'input[type="checkbox"]';
	radioButtonLocator: string = '[type="radio"]';

	sectionName = {
		Dropdowns: 0,
		Checkboxes: 1,
		RadioButtons: 2,
	};

	dropdownList: string[] = ['#dropdowm-menu-1', '#dropdowm-menu-2', '#dropdowm-menu-3'];

	dropdownListElements: string[][] = [
		['JAVA', 'C#', 'Python', 'SQL'],
		['Eclipse', 'Maven', 'TestNG', 'JUnit'],
		['HTML', 'CSS', 'JavaScript', 'JQuery'],
	];

	//dropdown list section

	checkEachListLength() {
		//iterate through each list
		for (let i: number = 0; i < this.dropdownListElements.length; i++) {
			//check list length assertion
			this.selectSection(this.sectionName['Dropdowns'])
				.find(this.dropdownList[i])
				.find('option')
				.should('have.length', this.dropdownListElements[i].length);
		}
	}

	// simple checklist iterator
	checkListElements() {
		for (let testedList: number = 0; testedList < this.dropdownListElements.length; testedList++) {
			this.selectSection(this.sectionName['Dropdowns'])
				.find(this.dropdownList[testedList])
				.find('option')
				.each(($el, i, $list) => {
					cy.wrap($el).should('have.text', this.dropdownListElements[testedList][i]);
				});
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
			cy.get(this.checkboxLocator).eq(checkboxRange).check().should('be.checked');
		} else {
			cy.get(this.checkboxLocator).eq(checkboxRange).uncheck().should('not.be.checked');
		}
	}

	// radio button section

	radioButtons() {
		// check each radio button and check if others are unchecked at the same time
		for (let index: number = 0; index < this.amountOfRadioButtons; index++) {
			this.clickRadioButton(this.sectionName['RadioButtons'], index);
		}
	}

	clickRadioButton(section: number, range: number) {
		// check chosen radio button & assert if that was done
		this.selectSection(section).find(this.radioButtonLocator).eq(range).check().should('be.checked');
		// confirm that other radio buttons are unchecked after first one was checked
		this.checkUncheckedRatioButtons(section, range);
	}

	checkUncheckedRatioButtons(section: number, skippedRadioButton: number) {
		for (let index: number = 0; index < this.amountOfRadioButtons; index++) {
			// skip chosen radio button
			if (skippedRadioButton != index) {
				this.selectSection(section).find(this.radioButtonLocator).eq(index).should('not.be.checked');
			}
		}
	}

	// helper functions

	selectSection(index: number) {
		return cy.get(this.sectionLocator).eq(index);
	}
}

export const dropdownsObject = new Dropdowns();
