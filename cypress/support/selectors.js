/// <reference types="cypress" />

export class PageElements {

    //------- env

    email = "jorji@ehtest.com"
    password = "admin"
    searchClient = "agape"
    clientName = "Agape Mechanical"

    //------- Login Form

    loginForm = '.mat-focus-indicator'
    email_input = '#mat-input-0'
    password_input = '#mat-input-1'
    submitLogin_btn = '.mat-focus-indicator'

    //------- Header Menu

    invoice = '[routerlink="/invoicesTab"]'

    //------- Invoice

    new_invoice = 'button.btn.btn-sm.btn-primary.m-r-sm.ng-star-inserted'
    select_customer = '[name="search"]'
    aMechanical = '[@b _ngcontent-wly-c382="">Agape Mechanical]'
    serviceLocations = '//*[@id="page-wrapper"]/invoice-edit/div[1]/form/div/div/app-customer-selector/div[1]/div[2]/div/div[2]/div/ul/li/p'                  
    proceed_but = 'button.btn.btn-primary.m-r-sm'

    //------- Invoice setup

    //type_to_search = "#mat-input-element.mat-form-field-autofill-control.mat-autocomplete-trigger.form-control.input-sm.ng-tns-c88-14.cdk-text-field-autofill-monitored.ng-pristine.ng-valid.ng-touched"

    importOptions = {
        
        selectAll : '.soas>>input[type="checkbox"]',
        search_input : 'input[aria-label="Search"]',
        submitImport_btn : '.soas>>>button.btn-success'

    }


    importedOrders_table = '.orders-rows'
    importedOrders = '.order-row'

    

}