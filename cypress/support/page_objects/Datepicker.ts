/// <reference types="cypress" />

interface DatePickerLevels {
	[key: string]: string;
}

export class Datepicker {
	datePickerSelector: string = '#datepicker';
	datePickerInputFieldSelector: string = '.form-control';
	monthYearSelector: string = '[class="datepicker-switch"]';
	daySelector: string = '[class="day"]';
	monthSelector: string = '[class="month"]';

	datepickerLevel: DatePickerLevels = {
		days: 'days',
		months: 'months',
		years: 'years',
	};

	selectDatePicker(version?: string) {
		if (version != undefined) {
			return cy.get(`.datepicker-${version}[style="display: block;"]`);
		} else {
			return cy.get(this.datePickerSelector);
		}
	}

	selectDatePickerLabel(version?: string) {
		return cy.get(`.datepicker-${version}[style="display: block;"]`).find(this.monthYearSelector).click();
	}

	// to use in future for searching beyond 2020 - 2029 year range
	selectNavButton(version?: string, isForward?: boolean) {
		if (isForward) {
			return cy.get(`.datepicker-${version}[style="display: block;"]`).find('[class="next"]').click();
		} else {
			return cy.get(`.datepicker-${version}[style="display: block;"]`).find('[class="back"]').click();
		}
	}

	checkDateInput(calculatedMonthNumber, calculatedDay, calculatedYear) {
		let dayForInputCheck = "0";
		let monthForInputCheck = "0";
		if (calculatedDay <= 9) {
			dayForInputCheck = "0" + calculatedDay;
		}
		if (calculatedMonthNumber <= 9) {
			monthForInputCheck = "0" + calculatedMonthNumber;
		}
		return cy
			.get(this.datePickerInputFieldSelector)
			.invoke('prop', 'value')
			.should('contain', `${monthForInputCheck}-${dayForInputCheck}-${calculatedYear}`);
	}

	// todo - finish refactor
	chooseDate(calculatedMonthShort, calculatedMonthNumber, calculatedDay, calculatedYear, isMonthsAndDays?: boolean) {
		if (isMonthsAndDays) {
			this.selectDatePicker(this.datepickerLevel['months']).contains(calculatedMonthShort).click();
			this.selectDatePicker(this.datepickerLevel['days']).find('[class="day"]').contains(calculatedDay).click();
			this.checkDateInput(calculatedMonthNumber, calculatedDay, calculatedYear);
		} else {
			this.selectDatePicker(this.datepickerLevel['days']).find('[class="day"]').contains(calculatedDay).click();
			this.checkDateInput(calculatedMonthNumber, calculatedDay, calculatedYear);
		}

		this.selectDatePicker(this.datepickerLevel['months']).contains(calculatedMonthShort).click();
		this.selectDatePicker(this.datepickerLevel['days']).find('[class="day"]').contains(calculatedDay).click();
		this.checkDateInput(calculatedMonthNumber, calculatedDay, calculatedYear);
	}

	pickDate(dateOffset: number) {
		// calculate new date from today's date
		let date: Date = new Date();
		date.setDate(date.getDate() + dateOffset);

		//set all necessary data for date calculation
		let calculatedDay = date.getDate();
		let calculatedMonthWord = date.toLocaleString('default', { month: 'long' });
		let calculatedMonthShort = date.toLocaleString('default', { month: 'short' });
		let calculatedMonthNumber = date.toLocaleString('default', { month: 'numeric' });
		let calculatedYear = date.getFullYear();

		// partial refactor

		// find datepicker and decide what to do next
		this.selectDatePicker()
			.find('input')
			.then((dateInput) => {
				cy.wrap(dateInput).click();
				cy.get(this.monthYearSelector).then((calendarLabel) => {
					let text = calendarLabel.text();

					// check if label contains calculated year
					// @ts-ignore
					if (!text.includes(String(calculatedYear))) {
						this.selectDatePickerLabel(this.datepickerLevel['days']);
						this.selectDatePickerLabel(this.datepickerLevel['months']);
						cy.contains('.year', calculatedYear).click();

						// todo - refactor duplicate code
						this.selectDatePicker(this.datepickerLevel['months']).contains(calculatedMonthShort).click();
						this.selectDatePicker(this.datepickerLevel['days'])
							.find(this.daySelector)
							.contains(calculatedDay)
							.click();
						this.checkDateInput(calculatedMonthNumber, calculatedDay, calculatedYear);

						// check if label contains calculated month
						// @ts-ignore
					} else if (!text.includes(String(calculatedMonthWord))) {
						this.selectDatePickerLabel(this.datepickerLevel['days']);

						// todo - refactor duplicate code
						this.selectDatePicker(this.datepickerLevel['months']).contains(calculatedMonthShort).click();
						this.selectDatePicker(this.datepickerLevel['days'])
							.find(this.daySelector)
							.contains(calculatedDay)
							.click();
						this.checkDateInput(calculatedMonthNumber, calculatedDay, calculatedYear);

						// if label contains both calculated year and month, just pick day
					} else {
						this.selectDatePicker(this.datepickerLevel['days'])
							.find(this.daySelector)
							.contains(calculatedDay)
							.click();
						this.checkDateInput(calculatedMonthNumber, calculatedDay, calculatedYear);
					}
				});
			});
	}
}

export const datepickerObject = new Datepicker();
