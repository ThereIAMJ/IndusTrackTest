/// <reference types="cypress" />

import {
   PageElements
} from "../support/selectors"


// pe - page element selector from ../support/selectors
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

    /*Navigate to Zones 
      cy.get('#header > .container-fluid > ul > .navbar-userinfo').click()
      cy.get('.fadeInLeft').contains('Settings').click()
      cy.get('.list-group').contains('Zones').click()

      // Import file via API
      cy.User_Auth(Cypress.env('users').admin['username'], Cypress.env('users').admin['password'])
         .then((response) => {

            expect(response.status).to.eq(200)

            var token = JSON.parse(response.body['token'])['access_token']

            console.log(token)

            cy.fixture('zones-2022-08-11_11-15-10.xlsx', 'binary').then(testFile => {
               const blob = Cypress.Blob.binaryStringToBlob(testFile);
               const formData = new FormData();
               formData.append('file', blob, 'zones-2022-08-11_11-15-10.xlsx');
      
               cy.request({
                  method: 'POST',
                  url: 'https://staging.api.freterium.com/v2/zones/import',
                  body: formData,
         */   //      headers: {
              //       "accept": "application/json, text/plain, */*",
              /*       "authorization": `Bearer ${token}`,
                  },
               }).then((resp)=>{
                  expect(resp.status).to.eq(200)
               })
            })
         })

         cy.reload()
         cy.get('tbody > tr').then((rows) => {
            cy.log(rows.length)
            cy.get(rows).eq(0).then((row) => {
                cy.wrap(row).within(() => {
                    cy.get('td >> button').click()
                    cy.contains('Delete').click()
                })
            })
        })*/

   })

})