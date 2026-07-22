import LoginPage from '../pageObjects/LoginPage'   
import InventoryPage from '../pageObjects/InventoryPage'
import CartPage from '../pageObjects/CartPage'
import CheckOutPage from '../pageObjects/CheckOutPage'

describe('Checkout', () => {
    let users

    before(() => {
        cy.fixture('users').then((data) => {
            users = data
        })
    })

    beforeEach(() => {
        LoginPage.visit()
        LoginPage.login(users.standardUser.username, users.standardUser.password)

        InventoryPage.clickProductButton('Sauce Labs Backpack')
        InventoryPage.getCartBadge().click()
        CartPage.goToCheckOut()
    })

    it('proceeds to the next step after filling required information', () => {
        CheckOutPage.fillInformation('John', 'Doe', '12345')
        CheckOutPage.clickContinue()

        cy.url().should('include', '/checkout-step-two.html')
    })

    it('calculates the total correctly based on item price and tax', () => {
        CheckOutPage.fillInformation('John', 'Doe', '12345')
        CheckOutPage.clickContinue()

        CheckOutPage.getSubtotal().then(($subtotal) => {
        const subtotal = parseFloat($subtotal.text().replace('Item total: $', ''))

        CheckOutPage.getTax().then(($tax) => {
        const tax = parseFloat($tax.text().replace('Tax: $', ''))

        CheckOutPage.getTotal().then(($total) => {
        const total = parseFloat($total.text().replace('Total: $', ''))

        expect(total).to.eq(subtotal + tax)
      })
    })
  })
})
    it('completes the purchase successfully', () => {
        CheckOutPage.fillInformation('John', 'Doe', '12345')
        CheckOutPage.clickContinue()
        CheckOutPage.clickFinish()

        cy.url().should('include', '/checkout-complete.html')
    })

    it('rejects checkout when first name is missing', () => {
        CheckOutPage.fillInformation('', 'Doe', '12345')
        CheckOutPage.clickContinue()

        CheckOutPage.getErrorMessage().should('contain.text', 'First Name is required')
})

    it('rejects checkout when last name is missing', () => {
        CheckOutPage.fillInformation('John', '', '12345')
        CheckOutPage.clickContinue()

        CheckOutPage.getErrorMessage().should('contain.text', 'Last Name is required')
})

    it('rejects checkout when postal code is missing', () => {
        CheckOutPage.fillInformation('John', 'Doe', '')
        CheckOutPage.clickContinue()

        CheckOutPage.getErrorMessage().should('contain.text', 'Postal Code is required')
})

})