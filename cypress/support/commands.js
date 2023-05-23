Cypress.Commands.add('loginConduit', (email, password) => { 
    cy.visit('/#/')
    cy.get('.nav-item').contains('Sign in').click()
    cy.get('input[placeholder="Email"]').type(email)
    cy.get('input[placeholder="Password"]').type(password)
    cy.get('button[type="submit"]').click()
 })