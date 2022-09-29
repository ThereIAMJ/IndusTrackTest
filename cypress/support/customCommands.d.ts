declare namespace Cypress {
    interface Chainable<Subject> {

      //-------Login

        login(email: any, password: any): Chainable<any>
        loginFormValidation(): Chainable<any>

      //------API

        invoiceTabValidation(): Chainable<any>
        selectFieldValidation(element: any): Chainable<any>
        agapeFieldValidation(element: any): Chainable<any>
        proceedButValidation(element: any): Chainable<any>
        iFrameValidation(element: any): Chainable<any>
        dropdownActionValidation(element: any): Chainable<any>
        tTSFValidation(element: any): Chainable<any>

      //------Commands

        iFrameCommand(element: any): Chainable<any>
        agapeSelector(element: any): Chainable<any>
        duplicateWindow(element: any): Chainable<any>

      //------ElementValidation
        
        elementIsVisible(element: any): Chainable<any>
        elementloaded(element: any): Chainable<any>
        elementExist(element: any): Chainable<any>
        
  }
}