import loginPage from "../../../pages/loginPage";

const loginPOM = new loginPage();

beforeEach(() => {
    // Intercept and Alias API Requests
    cy.intercept('POST', 'https://api.realworld.io/api/users/login').as('login')

    // Go to URL
    cy.visit('/#/')
})

describe('Conduit Login Scenarios', () => {
   
    it('User can Login with VALID User', () => {
        // Go to Sign In page, enter login info and login
        cy.get('.nav-item').contains('Sign in').click()
        loginPOM.login('qaportfolioaz@gmail.com', 'Loveqa!123');

        // Verify the user logged in successfully
        cy.get('.feed-toggle').contains('Your Feed')
        cy.get('.feed-toggle').contains('Global Feed')
    })

    it('User cannot login with INVALID User - Error appears', () => {
        // Go to Sign In page, enter login info for an INVALID user and click Sign In
        cy.get('.nav-item').contains('Sign in').click()
        loginPOM.login('abc@gmail.com', 'abc')

        // Verify Error Message appears
        cy.get('.error-messages').contains('email or password is invalid')
    })

    it('User cannot login with BLANK EMAIL - Error appears', () => {
        // Go to Sign In page, enter login info with a Blank Email and click Sign In
        cy.get('.nav-item').contains('Sign in').click()
        loginPOM.login(null,'abc')

        // Verify Error Message appears
        cy.get('.error-messages').contains('email can\'t be blank')
    })

    it('User cannot login with BLANK PASSWORD - Error appears', () => {
        // Go to Sign In page, enter login info with a Blank Password and click Sign In
        cy.get('.nav-item').contains('Sign in').click()
        loginPOM.login('abc@gmail.com', null)

        // Verify Error Message appears
        cy.get('.error-messages').contains('password can\'t be blank')
    })

    it('User cannot login with BLANK Values - API Returns a 500 error response', () => {
        // Go to Sign In page, enter login info with a Blank Password and click Sign In
        cy.get('.nav-item').contains('Sign in').click()
        loginPOM.login(null, null)

        // Verify Login API returns 500 status code response
        cy.wait('@login').its('response.statusCode').should('eq', 500)
    })
})