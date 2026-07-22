import LoginPage from '../pageObjects/LoginPage'

describe('Login', () => {

  let users

  before( () => {
    cy.fixture('users').then((data) => {
      users = data
    })
  })

  it('logs in successfully with a valid user', () => {
    LoginPage.visit()
    LoginPage.login(users.standardUser.username, users.standardUser.password)

    cy.url().should('include','/inventory.html')
  })

  it('blocks a locked out user', () => {
    LoginPage.visit()
    LoginPage.login(users.lockedOutUser.username, users.lockedOutUser.password)

    LoginPage.getErrorMessage().should('contain.text', 'locked out')
  })

  it("log in with credentials that don't exist in the system", () => {
    LoginPage.visit()
    LoginPage.login(users.invalidUser.username, users.invalidUser.password)

    LoginPage.getErrorMessage().should('contain.text', 'do not match')

  })

  it('rejects login with empty username and password', () => {
    LoginPage.visit()
    LoginPage.clickLoginButton()

    LoginPage.getErrorMessage().should('contain.text', 'Username is required')
  })

})