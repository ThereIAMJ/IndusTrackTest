declare namespace Cypress {
    interface Chainable<Subject> {
        login(email: any, password: any): Chainable<any>
        loginFormValidation(): Chainable<any>
        invoiceTabValidation(): Chainable<any>
        selectFieldValidation(element: any): Chainable<any>
        agapeFieldValidation(element: any): Chainable<any>
        proceedButValidation(element: any): Chainable<any>
        tTSFValidation(element: any): Chainable<any>
        elementIsVisible(element: any): Chainable<any>
        elementloaded(element: any): Chainable<any>
        elementExist(element: any): Chainable<any>
        navigateTo(root: any): Chainable<any>
        validateImportedOrders(itemsCount: any): Chainable<any>
        
  }
}