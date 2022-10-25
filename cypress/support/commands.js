/// <reference types="cypress" />

const {
  PageElements
} = require("../support/selectors")

const pe = new PageElements()

Cypress.Commands.add('loginForm', (username, password) => {
  //cy.get(pe.email_input).should('be.visible')
  cy.elementIsVisible(pe.email_input).clear().type(username)
  cy.elementIsVisible(pe.password_input).clear().type(password)
  cy.elementIsVisible(pe.submitLogin_btn).click()
  cy.intercept('POST', 'https://onetrackwebapi.azurewebsites.net/api/AddressBooks/GeoLocate/').as('homePageDownloaded')
  cy.wait('@homePageDownloaded').its('response.statusCode').should('eq', 200)

  cy.pageVerify('Home')

})

Cypress.Commands.add('selectCustomer', (searchClient, clientName) => {
  cy.goToPage('Invoices')
  cy.intercept('GET', 'https://onetrackwebapi.azurewebsites.net/api/invoices/GetInvoicesWithPaging/null/null/null/all?filter=null&sortBy=date&sortDirection=desc&pageIndex=0&pageSize=50').as('invoicePageDownloaded')
  cy.wait('@invoicePageDownloaded').its('response.statusCode').should('eq', 200)

  //------Closing reminder for continuing test if it exist
  cy.get("body").then($body => {
    if ($body.find('ul.nav.navbar-top-links.navbar-right > li[class= "dropdown open"]').length > 0) {
      cy.get('a.dropdown-toggle.count-info').click()
      cy.wait(1000)
    }
  })

  cy.get(pe.new_invoice).click()

  cy.intercept('GET', 'https://onetrackwebapi.azurewebsites.net/api/AddressBooks/GetAddressBooksWithPaging?filter=null&sortBy=companyName&sortDirection=asc&pageIndex=0&pageSize=20&inactiveOnly=false').as('selectFieldDownloaded')
  cy.wait('@selectFieldDownloaded').its('response.statusCode').should('eq', 200)

  cy.get('[name="search"]').clear().type(searchClient)

  cy.intercept('POST', 'https://onetrackwebapi.azurewebsites.net/api/AddressBooks/AddressBookLiveSearchExt').as('agapePageDownloaded')
  cy.wait('@agapePageDownloaded').its('response.statusCode').should('eq', 200)
  cy.wait(1000)

  //------Select our client name
  cy.get('.customerlist > .list-group').eq(0).its('children').then((item) => {
    cy.get('li>b').each((el) => {
      el.text() == clientName ? cy.log('Ok!') && cy.get(el).click() : cy.log('Elements didnt match')
    })
  })

  cy.get(pe.proceed_but).should('not.be.disabled').click()
  //------Verifying that there is invoice page
  cy.pageVerify('Invoice page')
})

Cypress.Commands.add('setUpInvoice', (discountAmount, discountType) => {
  cy.elementExist('#mat-input-6').click()
  cy.get('div.mat-autocomplete-panel.newcardsearchresult.ng-star-inserted.mat-autocomplete-visible').scrollTo("bottom")
  cy.wait(1000)

  //------Adding 2 new random item
  cy.get(pe.random_item).its('length').then((rand) => {
    cy.get(pe.random_item).eq(getRandomInt(rand - 1)).click()
    cy.get('#mat-input-6').click()
    cy.get('div.mat-autocomplete-panel.newcardsearchresult.ng-star-inserted.mat-autocomplete-visible').scrollTo("bottom")
    cy.wait(1000)
  })

  cy.get(pe.random_item).its('length').then((rand) => {
    cy.get(pe.random_item).eq(getRandomInt(rand - 1)).click()
    cy.wait(1000)

    //---------Verifying that there is duplicate window warning. If it is, than confirming duplication
    cy.get("body").then($body => {
      if ($body.find('.warningModal').length > 0) {
        cy.get('.warningModal').contains('Yes').click()
        cy.log('There are Duplications!')
      } else {
        cy.log('No Duplications!')
      }
    })
  })

  cy.elementExist('table.table.invoice-total.readonly > > > > a').click()
  cy.get('div.row > div.form-group >> input').clear().type(discountAmount)
  cy.get('div.row > div.form-group >> select').select(discountType)
  cy.elementExist('div.modal-footer > button.btn.btn-primary').contains('Save').click()
  cy.elementExist('.btn-group > .btn').click()
  cy.invoiceOptions('Previev')
  cy.elementExist(pe.iFrameBody)
})

Cypress.Commands.add('comparePrice', () => {
  cy.elementExist('.table.invoice-total.readonly >> tr.total > td')
  cy.elementExist('.table.invoice-total >> tr.total > td')
  cy.get('.table.invoice-total.readonly >> tr.total > td').eq(1).as('invoicePrice')

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
  cy.elementIsVisible(pe.iFrameClosebutton).click()
  cy.elementExist('.btn-group > .btn').click()
  cy.invoiceOptions('Delete')
  cy.elementExist(pe.invoice_delete_confirm).click()
  //cy.log("!!! FORCING RETEST !!!").click({force: false})

})

//------Functions

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//------ElementValidation

Cypress.Commands.add('elementIsVisible', (element) => {
  cy.get(element).should('be.visible')
})
Cypress.Commands.add('elementExist', (element) => {
  cy.get(element).should('be.exist')
})

Cypress.Commands.add('goToPage', (root) => {

  cy.get(pe.header_menu).then(() => {

    switch (root) {

      case 'Map':
        cy.get('ul[class="nav navbar-nav"] > li > a ').eq(0).click()
        break

      case 'Customer':
        cy.get('ul[class="nav navbar-nav"] > li > a ').eq(1).click()
        break

      case 'Estimates':
        cy.get('ul[class="nav navbar-nav"] > li > a ').eq(2).click()
        break

      case 'Schedule':
        cy.get('ul[class="nav navbar-nav"] > li > a ').eq(3).click()
        break

      case 'Invoices':
        cy.get('ul[class="nav navbar-nav"] > li > a ').eq(4).click()
        break

      case 'Timesheet':
        cy.get('ul[class="nav navbar-nav"] > li > a ').eq(5).click()
        break

      case 'SnowTrack':
        cy.get('ul[class="nav navbar-nav"] > li > a ').eq(6).click()
        break

      case 'P.O.':
        cy.get('ul[class="nav navbar-nav"] > li > a ').eq(7).click()
        break

      case 'Reports':
        cy.get('ul[class="nav navbar-nav"] > li > a ').eq(8).click()
        break

      default:
        break

    }

  })
})

Cypress.Commands.add('invoiceOptions', (root) => {

  cy.get(pe.header_menu).then(() => {

    switch (root) {

      case 'Save':
        cy.get('div > div > ul.dropdown-menu > li > a').eq(0).click()
        break

      case 'Save and Close':
        cy.get('div > div > ul.dropdown-menu > li > a').eq(1).click()
        break

      case 'Previev':
        cy.get('div > div > ul.dropdown-menu > li > a').eq(2).click()
        break

      case 'Send to E-Mail':
        cy.get('div > div > ul.dropdown-menu > li > a').eq(3).click()
        break

      case 'Print':
        cy.get('div > div > ul.dropdown-menu > li > a').eq(4).click()
        break

      case 'Send Reminder':
        cy.get('div > div > ul.dropdown-menu > li > a').eq(5).click()
        break

      case 'Receive Payment':
        cy.get('div > div > ul.dropdown-menu > li > a').eq(6).click()
        break

      case 'Copy':
        cy.get('div > div > ul.dropdown-menu > li > a').eq(7).click()
        break

      case 'Delete':
        cy.get('div > div > ul.dropdown-menu > li > a').eq(8).click()
        break

      case 'Close':
        cy.get('div > div > ul.dropdown-menu > li > a').eq(9).click()
        break

      default:
        break

    }

  })
})

  Cypress.Commands.add('pageVerify', (root) => {
    cy.location().should((loc) => {
  switch (root) {
    case 'Home':
      expect(loc.pathname).to.eq('/mapsTab')
      break

    case 'Invoice page':
      expect(loc.pathname).to.eq('/invoicesTab/overview/0')
      break
    
    default:
      break

  }
    })
})



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


