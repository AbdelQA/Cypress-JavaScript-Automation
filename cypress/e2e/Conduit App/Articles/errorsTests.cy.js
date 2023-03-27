beforeEach(() => {    
    // Intercept and Alias API request
    cy.intercept('POST', 'https://api.realworld.io/api/articles').as('articles')
    
    // Go to Conduit app and Login
    cy.loginConduit('qaportfolioaz@gmail.com', 'Loveqa!123')
})

describe('Verifying the error messages appear as expected on the New Article Page', () => {

    it('Error Appears when Article Title is Missing', () => {
        // Create a New Article and leave Title field Blank
        cy.get('.nav-link').contains('New Article').click()

        // Validate Missing Title Error message
        cy.get('.btn').contains('Publish Article').click()
        cy.wait('@articles').its('response.statusCode').should('eq', 422)
        cy.get('.error-messages').should('contain', 'title can\'t be blank')
    })

    it('Error Appears when Article Description is Missing', () => {        
        // Create a New Article and leave Description field Blank
        cy.get('.nav-link').contains('New Article').click()

        // Validate Missing Description Error message
        cy.get('input[placeholder="Article Title"]').type('Error Test')
        cy.get('.btn').contains('Publish Article').click()
        cy.wait('@articles').its('response.statusCode').should('eq', 422)
        cy.get('.error-messages').should('contain', 'description can\'t be blank')
    })

    it('Error Appears when Article Body is Missing', () => {
        // Create a New Article and leave Title field Blank
        cy.get('.nav-link').contains('New Article').click()

        // Validate Missing Body Error message
        cy.get('input[placeholder="Article Title"]').type('Error Test')
        cy.get('input[placeholder="What\'s this article about?"]').type('Error Test Description')
        cy.get('.btn').contains('Publish Article').click()
        cy.wait('@articles').its('response.statusCode').should('eq', 422)
        cy.get('.error-messages').should('contain', 'body can\'t be blank')
    })

})