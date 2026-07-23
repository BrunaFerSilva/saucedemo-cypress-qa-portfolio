describe('Login on SauceDemo with prior API health check', () => {
  it('confirms an external service is available before running the UI flow', () => {
    // Step 1 — API verification (setup / pre-condition)
    // Here we simulate checking that a backend is healthy before testing the UI
    cy.request('GET', 'https://jsonplaceholder.typicode.com/users/1')
      .its('status')
      .should('eq', 200)

    // Step 2 — Normal UI flow, only runs if the step above passes
    cy.visit('https://www.saucedemo.com/')

    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    cy.url().should('include', '/inventory.html')
    cy.get('.title').should('have.text', 'Products')
  })
})