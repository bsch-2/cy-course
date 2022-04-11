/// <reference types="cypress" />

interface DatePickerLevels {
    [key: string]: string;
}

export class DatepickerObject {
    datePickerSelector: string = '#datepicker';
    datePickerInputSelector: string = '[class="day"]';
    monthYearSelector: string = '[class="datepicker-switch"]';
    monthSelector: string = '[class="month"]';
    datepickerLevel: DatePickerLevels = {
        "days": "days",
        "months": "months",
        "years": "years"
    }

    datePicker() {
        this.pickDate(50);
    }

    selectDatePicker(version?: string) {
        if (version != undefined) {
            return cy.get(`.datepicker-${version}[style="display: block;"]`);
        } else {
            return cy.get(this.datePickerSelector);
        }

    }

    selectDatePickerLabel(version?: string) {
        return cy.get(`.datepicker-${version}[style="display: block;"]`).find('[class="datepicker-switch"]').click();
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
        return cy.get('.form-control').invoke('prop', 'value').should('contain', `${calculatedMonthNumber}-${calculatedDay}-${calculatedYear}`);
    }

    // for refactor
    chooseDate(calculatedMonthShort, calculatedMonthNumber, calculatedDay, calculatedYear, isMonthsAndDays?: boolean) {
        if (isMonthsAndDays) {
            this.selectDatePicker(this.datepickerLevel["months"]).contains(calculatedMonthShort).click();
            this.selectDatePicker(this.datepickerLevel["days"]).find('[class="day"]').contains(calculatedDay).click();
            this.checkDateInput(calculatedMonthNumber, calculatedDay, calculatedYear);
        } else {
            this.selectDatePicker(this.datepickerLevel["days"]).find('[class="day"]').contains(calculatedDay).click();
            this.checkDateInput(calculatedMonthNumber, calculatedDay, calculatedYear);
        }

        this.selectDatePicker(this.datepickerLevel["months"]).contains(calculatedMonthShort).click();
        this.selectDatePicker(this.datepickerLevel["days"]).find('[class="day"]').contains(calculatedDay).click();
        this.checkDateInput(calculatedMonthNumber, calculatedDay, calculatedYear);

    }

    pickDate(dateOffset: number) {
        let date: Date = new Date();
        // calculate new date including offset
        date.setDate(date.getDate() + dateOffset);

        let calculatedDay = date.getDate();
        let calculatedMonthWord = date.toLocaleString('default', {month: 'long'});
        let calculatedMonthShort = date.toLocaleString('default', {month: 'short'});
        let calculatedMonthNumber = date.toLocaleString('default', {month: 'numeric'});
        let calculatedYear = date.getFullYear();

        cy.log(calculatedMonthWord)
        cy.log(String(calculatedYear))
        cy.log(String(date))

        // partial refactor


        // find datepicker and decide what to do next
        this.selectDatePicker().find('input').then(dateInput => {
            cy.wrap(dateInput).click();
            cy.get(this.monthYearSelector).then(calendarLabel => {
                let text = calendarLabel.text();

                // check if label contains calculated year
                // @ts-ignore
                if (!text.includes(String(calculatedYear))) {
                    cy.log('doing backflips')
                    this.selectDatePickerLabel(this.datepickerLevel["days"]);
                    this.selectDatePickerLabel(this.datepickerLevel["months"]);
                    cy.contains('.year', calculatedYear).click();

                    // TO DO - refactor duplicate code
                    this.selectDatePicker(this.datepickerLevel["months"]).contains(calculatedMonthShort).click();
                    this.selectDatePicker(this.datepickerLevel["days"]).find('[class="day"]').contains(calculatedDay).click();
                    this.checkDateInput(calculatedMonthNumber, calculatedDay, calculatedYear);

                    // check if label contains calculated month
                    // @ts-ignore
                } else if (!text.includes(String(calculatedMonthWord))) {
                    cy.log('doing squats')
                    this.selectDatePickerLabel(this.datepickerLevel["days"]);

                    // TO DO - refactor duplicate code
                    this.selectDatePicker(this.datepickerLevel["months"]).contains(calculatedMonthShort).click();
                    this.selectDatePicker(this.datepickerLevel["days"]).find('[class="day"]').contains(calculatedDay).click();
                    this.checkDateInput(calculatedMonthNumber, calculatedDay, calculatedYear);

                    // if label contains both calculated year and month, just pick day
                } else {
                    cy.log('picking up tomatoes')
                    this.selectDatePicker(this.datepickerLevel["days"]).find('[class="day"]').contains(calculatedDay).click();
                    this.checkDateInput(calculatedMonthNumber, calculatedDay, calculatedYear);
                }
            })
        })
    }

}

export const datepickerObject = new DatepickerObject();