class CartPage {
    getCartItems() {
        return cy.get("[data-test='inventory-item']")
    }

    removeProduct(productName) {
        cy.contains("[data-test='inventory-item-name']", productName)
        .parents('.cart_item')
        .find('button')
        .click()
    }

    continueShopping() {
        cy.get("[data-test='continue-shopping']").click()
    }

    goToCheckOut() {
        cy.get("[data-test='checkout']").click()
    }
}

export default new CartPage()