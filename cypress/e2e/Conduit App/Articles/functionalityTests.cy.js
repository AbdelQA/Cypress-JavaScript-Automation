beforeEach(() => {
    // Intercept and Alias API Requests
    cy.intercept('POST', 'https://api.realworld.io/api/articles').as('articles')
    cy.intercept('GET', 'https://api.realworld.io/api/articles?author=qatesting&limit=5&offset=0').as('allArticles')
    
    // Go to Conduit app and Login
    cy.loginConduit('qaportfolioaz@gmail.com', 'Loveqa!123')
})

describe('Verify user can Create, View and Delete a Newly Created Article', () => {
    let date = new Date().toLocaleString()

    const articleName = 'Cypress Automation ' + date
    const articleDescription = 'Article Description'
    const articleText = 'This is the Article text'
    const tagName = 'Tag ' + date

    it('Add, View and Delete a New Article', () =>{
        // Create a New Article and enter value for all fields
        cy.get('.nav-link').contains('New Article').click()
        cy.get('input[placeholder="Article Title"]').type(articleName)
        cy.get('input[placeholder="What\'s this article about?"]').type(articleDescription)
        cy.get('textarea[placeholder="Write your article (in markdown)"]').type(articleText)
        cy.get('input[placeholder="Enter tags"]').type(tagName)

        // Publish the Article 
        cy.get('.btn').contains('Publish Article').click()
        cy.wait('@articles').its('response.statusCode').should('eq', 200)

        // Verify Article appears on Profile
        cy.get('.user-pic').click()
        cy.get('.preview-link').contains(articleDescription)
        cy.get('.preview-link').contains(articleName).click()

        // Verify Article Details appear on Details page
        cy.get('.banner').contains(articleName)
        cy.get('.row.article-content').contains(articleText)

        // Delete the newly created article from the previous tests
        cy.get('.ion-trash-a').eq(0).click({force: true})
        cy.location('pathname').should('eq', '/')
        
        // Verify the Article was deleted successfully
        cy.get('.user-pic').click()
        cy.get('.article-preview').contains('No articles are here... yet.')
    })
})