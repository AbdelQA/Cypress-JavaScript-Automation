describe('Search', () => {
    
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('www.weather.com');
  })
  
  it('Verify user can search for a valid zip code and selects the correct city from Predictive Search', () => {
    
    // Enter text in Search Field
    cy.get('[id="LocationSearch_input"]').type("90012");
    
    // Select the correct option from the predictive search
    cy.get('[data-testid="ctaButton"]').contains("Los Angeles, CA").click();
   
    // Verify the Module exists
    cy.get('[data-testid="TodayWeatherModule"]').contains("Today's Forecast for Los Angeles, CA");
    })

  it('Verify user do a valid search and module does NOT contain certain text', () => {
    
    // Enter text in Search Field
    cy.get('[id="LocationSearch_input"]').type("91355");
          
    // Select the correct option from the predictive search
    cy.get('[data-testid="ctaButton"]').contains("Valencia, CA").click();
        
    // Verify the Module does NOT contain some random text
    cy.get('[data-testid="TodayWeatherModule"]').should('not.contain', "dasdas");
    })

  it('Verify invalid entry does not produce any results', () => {
    
    // Enter invalid text in Search Field
    cy.get('[id="LocationSearch_input"]').type("randomtextdoesntexist");
          
    // Verify that NO Results are Found
    cy.get('[role="alert"]').contains("No results found");
    })


  it.skip('Verify invalid entry does not produce any results', () => {
  

    // Close the Privacy Popup
    cy.get('[data-testid="Icon"][name="close"]').click();

    // NOTE: FIGURE OUT HOW TO USE SOMETHING OTHER THAN A WAIT
    cy.get('[data-testid="Icon"][name="close"]').should('not.exist');

    // Login to site via Main Menu > Log In option
    cy.get('#MainMenuTrigger').should('be.visible').click();

    cy.get('[data-testid="ctaButton"]').should('be.visible').contains('Log In').click({force: true});
    cy.get('#loginEmail').should('be.visible').type("qaportfolioaz@gmail.com");
    cy.get('#loginPassword').should('be.visible').type("Loveweather!123");
    cy.wait(1000);
    cy.get('[type="submit"]').should('be.visible').trigger("click");
    cy.get('[aria-label="The Weather Company - Home"]').click();
    cy.get('[name="user-registered-stroke"]').should('be.visible').click({force: true});
    cy.get('[data-from-string="go-premium_AccountLink"]').contains('Manage Account').click();
    cy.get('[aria-label="Profile"]').should('be.visible').contains('Not a subscriber');
  })
  

})


/*

CypressError: Timed out retrying after 4050ms: `cy.click()` failed because this element is not visible:

`<button data-testid="ctaButton" class="Button--default--2gfm1 AccountLinks--loginLink--o69y1" type="button">Log In</button>`

This element `<button.Button--default--2gfm1.AccountLinks--loginLink--o69y1>` is not visible because its parent 
`<nav.ExpandableMenu--ExpandableMenu--Pypws>` has CSS property: `display: none`

Fix this problem, or use `{force: true}` to disable error checking.
    at runVisibilityCheck (https://weather.com/__cypress/runner/cypress_runner.js:151949:66)
    at Object.isStrictlyVisible (https://weather.com/__cypress/runner/cypress_runner.js:151963:10)
    at runAllChecks (https://weather.com/__cypress/runner/cypress_runner.js:130563:26)
    at retryActionability (https://weather.com/__cypress/runner/cypress_runner.js:130631:16)
From previous event:
    at whenStable (https://weather.com/__cypress/runner/cypress_runner.js:146732:65)
    at <unknown> (https://weather.com/__cypress/runner/cypress_runner.js:146173:14)
From Your Spec Code:
    at Context.eval (webpack:///./cypress/e2e/logintest.cy.js:56:59)

*/