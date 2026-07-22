import LoginPage from '../pageObjects/LoginPage'
import InventoryPage from '../pageObjects/InventoryPage'
import CartPage from '../pageObjects/CartPage'

describe('Cart', () => {
    let users

    before(() => {
        cy.fixture('users').then((data) => {
            users = data
        })
    })

    beforeEach(() => {
        LoginPage.visit()
        LoginPage.login(users.standardUser.username, users.standardUser.password)
    })

    it('shows added products in the cart', () => {
        InventoryPage.clickProductButton('Sauce Labs Backpack')
        InventoryPage.clickProductButton('Sauce Labs Bike Light')

        InventoryPage.getCartBadge().click()
        CartPage.getCartItems().should('have.length', 2)
    })

    it('removes a product from the cart', () => {
        InventoryPage.clickProductButton('Sauce Labs Backpack')
        InventoryPage.clickProductButton('Sauce Labs Bike Light')

        InventoryPage.getCartBadge().click()

        CartPage.removeProduct('Sauce Labs Backpack')

        CartPage.getCartItems().should('have.length', 1)
    })

    it('returns to the inventory page when clicking continue shopping', () => {
        InventoryPage.clickProductButton('Sauce Labs Backpack')
        InventoryPage.getCartBadge().click()

        CartPage.continueShopping()

        cy.url().should('include', '/inventory.html')
    })

    it('proceeds to checkout', () => {
        InventoryPage.clickProductButton('Sauce Labs Backpack')
        InventoryPage.getCartBadge().click()

        CartPage.goToCheckOut()

        cy.url().should('include', '/checkout-step-one.html')
    })

})