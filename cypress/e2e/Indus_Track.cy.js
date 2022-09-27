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

   it('Invoice', () => {

      cy.STR(pe.email, pe.password, pe.searchClient, pe.clientName )

   })

})

    