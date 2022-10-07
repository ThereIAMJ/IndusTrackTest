class homePage {
  elements = {
    usernameInput: () => cy.get("#mat-input-0"),
    passwordInput: () => cy.get("#mat-input-1"),
    loginBtn: () => cy.get(".mat-focus-indicator"),
    errorMessage: () => cy.get('span[class="ng-star-inserted"]'),
  };

  typeUsername(username) {
    this.elements.usernameInput().type(username);
  }

  typePassword(password) {
    this.elements.passwordInput().type(password);
  }

  clickLogin() {
    this.elements.loginBtn().click();
  }

  submitLogin(username,password){
    this.elements.usernameInput().type(username);
    this.elements.passwordInput().type(password);
    this.elements.loginBtn().click();
  }
}

module.exports = new homePage();
