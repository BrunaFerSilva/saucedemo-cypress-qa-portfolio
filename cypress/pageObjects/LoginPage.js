class LoginPage {
    visit() {
        cy.visit('https://www.saucedemo.com')
    }

    login(username, password) {
        cy.get('[data-test="username"]').type(username)
        cy.get('[data-test="password"]').type(password)
        cy.get('[data-test="login-button"]').click()
    }

    getErrorMessage() {
        return cy.get('[data-test="error"]')
    }

    clickLoginButton() {
        cy.get("[data-test='login-button']").click()
    }
}

export default new LoginPage()