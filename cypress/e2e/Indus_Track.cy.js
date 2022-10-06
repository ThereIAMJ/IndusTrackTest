/// <reference types="cypress" />

import {
   PageElements
} from "../support/selectors"

const pe = new PageElements()

describe('Indus Track Test', () => {
   beforeEach(() => {
      cy.visit('/')
      Cypress.on('uncaught:exception', (err, runnable) => {
         return false
      })
      cy.clearLocalStorage()
   })

   it('New Invoice Test', () => {
      cy.loginForm(Cypress.env('users').admin["username"], Cypress.env('users').admin["password"])
      cy.selectCustomer("agape", "Agape Mechanical")
      cy.setUpInvoice(10, 0)// discound amount, discount type [0 - %; 1 - $]
      cy.comparePrice()
      cy.deleteDraftInvoice()

   })
})

