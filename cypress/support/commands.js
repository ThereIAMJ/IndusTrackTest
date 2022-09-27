/// <reference types="cypress" />

const {
  PageElements
} = require("../support/selectors")

const pe = new PageElements()

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

Cypress.Commands.add('STR', (email, password, searchClient, clientName) => {
  cy.get(pe.email_input).clear().type(email)
  cy.get(pe.password_input).clear().type(password)
  cy.get(pe.submitLogin_btn).should('not.be.disabled')
  cy.get(pe.loginForm).click()
  cy.loginFormValidation.call();

  cy.get(pe.invoice).click()
  cy.get(pe.new_invoice).click()    
  cy.selectFieldValidation.call();   
  cy.get(pe.select_customer).clear().type(searchClient)
  cy.agapeFieldValidation.call();
  cy.wait(1000)
  cy.agapeSelector.call();
  cy.get(pe.proceed_but).should('not.be.disabled')
  cy.get(pe.proceed_but).click()
  cy.url().should('eq', 'https://onetrackui.azurewebsites.net/invoicesTab/overview/0')

  //cy.get(pe.test_sec_option, setTimeout = 100 ).click()////////////////////

  cy.get(pe.search_field).click()
  cy.tTSFValidation.call();
  cy.wait(1000)
  cy.get(pe.test_option).click()
  //cy.pause()
  cy.wait(1000)
  cy.get(pe.search_field).click()
  cy.wait(1000)
  cy.get(pe.test_sec_option).click()
  cy.wait(1000)
  cy.get(pe.discount_add).click()
  cy.get(pe.discount_number).clear().type('10')
  cy.get(pe.discount_type).select(0)
  cy.get(pe.discount_submit).click()
  cy.get(pe.invoice_actions).click()
  cy.wait(1000)
  cy.get(pe.invoice_preview).contains("Preview").click()
  cy.wait(1000)
  cy.get(pe.prise_field).eq(1).as('invoicePrice')
  cy.wait(1000)
  cy.iFrameCommand.call();
  cy.get(pe.iFrameClosebutton).click()
  cy.get(pe.invoice_actions).click()
  cy.wait(1000)
  cy.get(pe.invoice_delete).contains("Delete").click()
  cy.get(pe.invoice_delete_confirm).click()

  
}) 
  //cy.iFrameCommand


  //cy.elementExist(pe.prise_field).eq(1)
  //cy.elementExist(pe.preview_prise_field).eq(1)
  

  //cy.get(pe.new_invoice, { timeout: 100 }).click

  //------API  

  Cypress.Commands.add('loginFormValidation', () => {
    cy.intercept('POST', 'https://onetrackwebapi.azurewebsites.net/api/AddressBooks/GeoLocate/').as('homePageDownloaded')
    cy.wait('@homePageDownloaded').its('response.statusCode').should('eq', 200)
    //cy.get(pe.loginForm).should('be.visible')
    //cy.get(pe.email_input).should('be.visible').and('have.attr', 'placeholder', 'Username')
    //cy.get(pe.password_input).should('be.visible').and('have.attr', 'placeholder', 'Password')
    //cy.get(pe.submitLogin_btn).should('be.visible').and('have.text', 'Ready for a drive ?')

  })
  Cypress.Commands.add('invoiceTabValidation', () => {
    cy.intercept('GET', 'https://onetrackwebapi.azurewebsites.net/api/ProposalSettings/GetEmailTemplates').as('invoicePageDownloaded')
    cy.wait('@invoicePageDownloaded').its('response.statusCode').should('eq', 200)

  })

  Cypress.Commands.add('selectFieldValidation', () => {
    cy.intercept('GET', 'https://onetrackwebapi.azurewebsites.net/api/AddressBooks/GetAddressBooksWithPaging?filter=null&sortBy=companyName&sortDirection=asc&pageIndex=0&pageSize=20&inactiveOnly=false').as('selectPageDownloaded')
    cy.wait('@selectPageDownloaded').its('response.statusCode').should('eq', 200)

  })

  Cypress.Commands.add('agapeFieldValidation', () => {
    cy.intercept('POST', 'https://onetrackwebapi.azurewebsites.net/api/AddressBooks/AddressBookLiveSearchExt').as('agapePageDownloaded')
    cy.wait('@agapePageDownloaded').its('response.statusCode').should('eq', 200)

  })

  Cypress.Commands.add('tTSFValidation', () => {
    cy.intercept('GET', 'https://onetrackwebapi.azurewebsites.net/api/invoices/DefaultTerm').as('typeToSearch')
    cy.wait('@typeToSearch').its('response.statusCode').should('eq', 200)
  
  })

  Cypress.Commands.add('proceedButValidation', () => {
    cy.intercept('GET', 'https://onetrackwebapi.azurewebsites.net/api/AddressBooks/GetServiceLocations/544118').as('proceedButPageDownloaded')
    cy.wait('@proceedButPageDownloaded').its('response.statusCode').should('eq', 200)

  })

  Cypress.Commands.add('iFrameValidation', () => {
    cy.intercept('GET', 'https://onetrackwebapi.azurewebsites.net/api/Warehouse/').as('getIFrameValidation')
    cy.wait('@getIFrameValidation').its('response.statusCode').should('eq', 200)
  })

  //------Commands

  Cypress.Commands.add('agapeSelector', () => {
    cy.get('.customerlist > .list-group').eq(0).its('children').then((item)=>{
      cy.get('li>b').each((el)=>{
        el.text() == pe.clientName ? cy.log('Ok!') && cy.get(el).click() : cy.log('Elements didnt match')
      })
    })
  })

  Cypress.Commands.add('iFrameCommand', () => {
    cy.get('@invoicePrice').invoke('text').then((text) => {
      const counts = text
        cy.get(pe.iFrameBody).its('0.contentDocument.body').should('be.visible')
        .then(cy.wrap)
        cy.get('.table.invoice-total >> tr.total > td').eq(1).invoke('text').then((text) => {
          const new_counts = text
          expect(counts).to.eq(new_counts)

        })

    })
    

  })

//------ElementValidation

  Cypress.Commands.add('elementIsVisible', (element) => {
    cy.get(element).should('be.visible')
  })
  Cypress.Commands.add('elementExist', (element) => {
    cy.get(element).should('be.exist')
  })















    //--------------------------------------------USEFUL----------------------------------

  /*cy.location().should((loc) => {
    switch (root) {
      case 'Home':
        expect(loc.pathname).to.eq('/order-add')
        break

      case 'Import & Optimize':

        expect(loc.pathname).to.eq('/orders-import')
        break
      default:
        break
    }
  })*/

/*Cypress.Commands.add('importOption', (optName) => {

  switch (optName) {

    case 'Select all':
      cy.get(pe.importOptions.selectAll).click()
      break

    case 'Group Orders':
      cy.get(pe.importOptions_wrap).contains(optName).click()
      break

    case 'Ungroup':
      cy.get(pe.importOptions_wrap).contains(optName).click()
      break

    case 'Validate':
      cy.get(pe.importOptions_wrap).contains(optName).click()
      cy.get(pe.importOptions.submitImport_btn).should('not.be.disabled')
      break

    case 'Delete':
      cy.get(pe.importOptions_wrap).contains(optName).click()
      break

    case 'Global map':
      cy.get(pe.importOptions_wrap).contains(optName).click()
      break

    default:
      break;
  }
})*/


