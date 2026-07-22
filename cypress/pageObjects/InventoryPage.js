class InventoryPage {
    getPageTitle() {
        return cy.get("[data-test='title']")
    }   
        clickProductButton(productName) {
        cy.contains("[data-test='inventory-item-name']", productName)
        .parents('.inventory_item')
        .find('button')
        .click()
    }

    getCartBadge() {
        return cy.get("[data-test='shopping-cart-badge']")
    }

    getAllProducts() {
        return cy.get("[data-test='inventory-item']")
    }

    sortBy(value) {
        cy.get("[data-test='product-sort-container']").select(value)
    }

    getAllPrices() {
        return cy.get('[data-test="inventory-item-price"]')
    }
}

export default new InventoryPage()