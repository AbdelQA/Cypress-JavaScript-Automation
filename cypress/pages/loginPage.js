class loginPage {
    // Locators
    get email() {
      return cy.get('[placeholder="Email"]');
    }
  
    get password() {
      return cy.get('[placeholder="Password"]');
    }
  
    get submitBtn() {
      return cy.get('[type="submit"]');
    }
  
    // Page Object Methods
    login(email, password) {
      if(email != null){
        this.email.type(email);
      }
      if (password != null){
      this.password.type(password);
      }
      this.submitBtn.click();
    }
  }

// Export the class
export default loginPage;
  