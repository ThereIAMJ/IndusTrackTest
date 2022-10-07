import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
const loginPage = require("../../pages/LoginPage");

Given("A web browser is at the azurewebsite login page", () => {
  cy.visit("/");
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
 })
});

When("A user enters the username {string}, the password {string}, and clicks on the login button", (username,password) => {
  loginPage.submitLogin(username,password)
});

When("A user provides incorrect credentials, and clicks on the login button", (table) => {
  table.hashes().forEach((row) => {
    cy.log(row.username);
    cy.log(row.password);
    loginPage.submitLogin(row.username, row.password)
    
  });
});
Then("the location should equalthe mapsTab link", () => {
  cy.location('pathname').should('eq', '/mapsTab')
});
Then("The error message {string} is displayed", (errorMessage) => {
  loginPage.elements.errorMessage().should("have.text", errorMessage);
});
