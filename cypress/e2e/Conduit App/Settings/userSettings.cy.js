beforeEach(() => {
    // Intercept and Alias API request
    cy.intercept('GET', 'https://conduit.productionready.io/api/profiles/qatesting').as('profile')
    
    // Go to Conduit app and Login
    cy.loginConduit('qaportfolioaz@gmail.com', 'Loveqa!123')
})

describe('Validating User Settings page', () => {
    it('Update Bio Settings for User', () =>{
        // Go to Settings page
        cy.get('.ion-gear-a').click()
        
        // Validate Default Bio Text then Update text
        cy.get('[placeholder="Short bio about you"]').should('have.value', 'My Bio Default')
        cy.get('[placeholder="Short bio about you"]').clear().type('My Bio Automation Test')
        cy.contains('Update Settings').click()
	    cy.wait('@profile').its('response.statusCode').should('eq', 307)

        // Navigate to Home then Back to Settings to validate text        
	    cy.get('[ui-sref="app.home"]').eq(1).click({force: true})
        cy.get('.ion-gear-a').click()
        cy.get('[placeholder="Short bio about you"]').should('be.visible').and('have.value', 'My Bio Automation Test')
        
        // Update text back to Default text
        cy.get('[placeholder="Short bio about you"]').clear().type('My Bio Default')
        cy.contains('Update Settings').click()
    })
})