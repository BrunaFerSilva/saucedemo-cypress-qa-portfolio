class CheckOutPage {
    fillInformation(firstName, lastName, postalCode) {
        if(firstName) {
            cy.get('[data-test="firstName"]').type(firstName)
    }
        if (lastName) {
            cy.get('[data-test="lastName"]').type(lastName)
    }
        if (postalCode) {
            cy.get('[data-test="postalCode"]').type(postalCode)
    }
  }

    clickContinue() {
        cy.get('[data-test="continue"]').click()
    }

    clickCancel() {
        cy.get('[data-test="cancel"]').click()
    }

    getErrorMessage() {
        return cy.get('[data-test="error"]')
    }

    getSubtotal(){
        return cy.get('[data-test="subtotal-label"]')
    }

    getTax() {
        return cy.get('[data-test="tax-label"]')
    }

    getTotal() {
        return cy.get('[data-test="total-label"]')
    }

    clickFinish() {
        cy.get('[data-test="finish"]').click()
    }
}

export default new CheckOutPage()