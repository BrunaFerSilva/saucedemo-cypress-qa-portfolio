import LoginPage from '../pageObjects/LoginPage'
import InventoryPage from '../pageObjects/InventoryPage'

describe('Inventory', () => {

  let users

  before( () => {
    cy.fixture('users').then((data) => {
      users = data
    })
  })

  beforeEach( () => {
    LoginPage.visit()
    LoginPage.login(users.standardUser.username, users.standardUser.password)
  })

  it('displays the products page title', () => {
    InventoryPage.getPageTitle().should('have.text', 'Products')
  })

  it('adds a product to the cart and updates the badge count', () => {
    InventoryPage.clickProductButton('Sauce Labs Backpack')

    InventoryPage.getCartBadge().should('have.text', '1')
  })

  it('displays all 6 products', () => {
    InventoryPage.getAllProducts().should('have.length', 6)
  })

  it('adds multiple products to the cart and updates the badge accordingly', () => {
    InventoryPage.clickProductButton('Sauce Labs Backpack')
    InventoryPage.clickProductButton('Sauce Labs Bike Light')
    InventoryPage.clickProductButton('Sauce Labs Bolt T-Shirt')

    InventoryPage.getCartBadge().should('have.text', '3')
  })

  it('removes a product from the cart directly from the inventory page', () => {
    InventoryPage.clickProductButton('Sauce Labs Backpack')
    InventoryPage.getCartBadge().should('have.text', '1')

    InventoryPage.clickProductButton('Sauce Labs Backpack')
    InventoryPage.getCartBadge().should('not.exist')
  })

  it('sorts products by price, low to high', () => {
    InventoryPage.sortBy('lohi')

    InventoryPage.getAllPrices().then(($prices) => {
      const values = [...$prices].map((el) => parseFloat(el.innerText.replace('$', '')))
      const sorted = [...values].sort((a,b) => a - b)

      expect(values).to.deep.equal(sorted)
    })
  })

    it('sorts products by price, high to low', () => {
    InventoryPage.sortBy('hilo')

    InventoryPage.getAllPrices().then(($prices) => {
      const values = [...$prices].map((el) => parseFloat(el.innerText.replace('$', '')))
      const sorted = [...values].sort((a,b) => b - a)

      expect(values).to.deep.equal(sorted)
    })
})

})