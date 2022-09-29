/// <reference types="cypress" />

const {
  PageElements
} = require("../support/selectors")

const pe = new PageElements()

Cypress.Commands.add('registrationForm', (username, password) => {
  cy.get(pe.email_input).clear().type(username)
  cy.get(pe.password_input).clear().type(password)
  cy.get(pe.submitLogin_btn).should('not.be.disabled')
  cy.get(pe.loginForm).click()
  cy.elementIsVisible('ul[class="nav navbar-nav"] > li > ').contains('Invoice')
})

Cypress.Commands.add('selectCustomer', (searchClient, clientName) => {
  cy.get(pe.invoice).click()
  cy.get(pe.new_invoice).click()    
  cy.intercept('GET', 'https://onetrackwebapi.azurewebsites.net/api/AddressBooks/GetAddressBooksWithPaging?filter=null&sortBy=companyName&sortDirection=asc&pageIndex=0&pageSize=20&inactiveOnly=false').as('selectPageDownloaded')
    cy.wait('@selectPageDownloaded').its('response.statusCode').should('eq', 200)  
  cy.get(pe.select_customer).clear().type(searchClient)
  cy.intercept('POST', 'https://onetrackwebapi.azurewebsites.net/api/AddressBooks/AddressBookLiveSearchExt').as('agapePageDownloaded')
    cy.wait('@agapePageDownloaded').its('response.statusCode').should('eq', 200)
  cy.wait(1000)
  //------Select our client name
  cy.get('.customerlist > .list-group').eq(0).its('children').then((item)=>{
    cy.get('li>b').each((el)=>{
      el.text() == clientName ? cy.log('Ok!') && cy.get(el).click() : cy.log('Elements didnt match')
    })
  })                                                                                                    
  cy.get(pe.proceed_but).should('not.be.disabled').click()
    //cy.get(pe.proceed_but).click()
  //------Verivying that there is invoice page
  cy.location().should((loc)=> {                                          
  expect(loc.pathname).to.eq('/invoicesTab/overview/0')   
  }) 
})

Cypress.Commands.add('setUpInvoice', (discountAmount, discountType) => {
  cy.get(pe.search_field).click()
  cy.wait(1000)
  //------Adding new random item
  cy.get(pe.random_item).its('length').then((rand)=>{
    cy.get(pe.random_item).eq(getRandomInt(rand)).click()
  cy.get(pe.search_field).click()
  })
  cy.wait(1000)
  cy.get(pe.random_item).its('length').then((rand)=>{
    cy.get(pe.random_item).eq(getRandomInt(rand)).click()
  })
  cy.wait(1000)
  //---------Verifying that there is duplicate window warning. If it is, than confirming duplication
  if (Cypress.$(pe.dublicate).length > 0) {                                                     
    cy.get(pe.dupl_button).click()                                                              
    cy.wait(1000)
  }

  cy.get(pe.discount_add).click()
  cy.get(pe.discount_number).clear().type(discountAmount)
  cy.get(pe.discount_type).select(discountType)
  cy.get(pe.discount_submit).click()
  cy.get(pe.invoice_actions).click()
  cy.get(pe.invoice_preview).contains("Preview").click()
})
Cypress.Commands.add('comparePrice', () => {
  cy.intercept('GET', 'https://onetrackwebapi.azurewebsites.net/api/common/GetTaxRates').as('getIFrameValidation')
    cy.wait('@getIFrameValidation').its('response.statusCode').should('eq', 200)
  cy.get(pe.prise_field).eq(1).as('invoicePrice')
  //------Comparing creating pages prise and prise from iFrame
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

  Cypress.Commands.add('deleteDraftInvoice', () => {
  cy.get(pe.iFrameClosebutton).click()
  cy.get(pe.invoice_actions).click()
  cy.get(pe.invoice_delete).contains("Delete").click()
  cy.get(pe.invoice_delete_confirm).click()

}) 
 
  //------Functions

  function getRandomInt(max) {
    return Math.floor(Math.random() * (max - 1)) ;
  }
 
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


