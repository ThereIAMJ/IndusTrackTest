declare namespace Cypress {
    interface Chainable<Subject> {

      registrationForm(username: any, password: any): Chainable<any>
      selectCustomer(searchClient: any, clientName: any): Chainable<any>
      setUpInvoice(element: any): Chainable<any>

      //------Commands

        comparePrice(element: any): Chainable<any>
        deleteDraftInvoice(element: any): Chainable<any>

        iFrameCommand(element: any): Chainable<any>
        duplicateWindow(element: any): Chainable<any>
        
        elementIsVisible(element: any): Chainable<any>
        elementloaded(element: any): Chainable<any>
        elementExist(element: any): Chainable<any>
        
  }
}