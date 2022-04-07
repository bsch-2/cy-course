/// <reference types="cypress" />

export class AjaxLoader {
    // myDiv: string = Cypress.$('#myDiv').attr('style');
    // text: string = "nothing"
    clickMeButton: string = '#myDiv';

    clickMeButtonWait() {
        cy.get(this.clickMeButton).click({timeout: 10000});
    }

    // clickMeButton() {
    //     cy.log(this.text)
    //     cy.get('#myDiv').invoke('attr', 'style')
    //     expect(this.myDiv).to.be.equal("")
    //     cy.log(this.text)
    //     // cy.waitUntil(() => ())
    // }
}

export const ajaxLoader = new AjaxLoader();

// it('Should detect the DOM change with cy.waitUntil', () => {
//     cy.contains('Mutate after a random delay').click()
//     cy.waitUntil(() => (mutationsHistory.length ? mutationsHistory : false)).then(
//         (mutationsHistory) => {
//             cy.log('Now you can do whatever you want with `mutationsHistory`')
//             console.log(mutationsHistory)
//         }
//     )
// })