beforeEach(() => {
    // Go to URL
    cy.visit('https://demo.realworld.io/#/')
})

describe('Conduit Login Scenarios', () => {
   
    it('Login with VALID User', () => {
        // Go to Sign In page, enter login info and login
        cy.get('.nav-item').contains('Sign in').click()
        cy.get('[placeholder="Email"]').type('qaportfolioaz@gmail.com')
        cy.get('[placeholder="Password"]').type('Loveqa!123')
        cy.get('[type="submit"]').click()

        // Verify the user logged in successfully
        cy.get('.feed-toggle').contains('Your Feed')
        cy.get('.feed-toggle').contains('Global Feed')
    })

    it('Login with INVALID User', () => {
        // Go to Sign In page, enter login info for an INVALID user and login
        cy.get('.nav-item').contains('Sign in').click()
        cy.get('[placeholder="Email"]').type('abc@gmail.com')
        cy.get('[placeholder="Password"]').type('abc')
        cy.get('[type="submit"]').click()

        // Verify Error Message appears
        cy.get('.error-messages').contains('email or password is invalid')
    })
})