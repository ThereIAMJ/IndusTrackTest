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
    proceed_but = 'button.btn.btn-primary.m-r-sm'

    //------- Invoice setup

    search_field = '#mat-input-6'
    test_option = '#mat-option-11'
    test_sec_option = '#mat-option-12'
    discount_add = 'tr.ng-star-inserted > :nth-child(2) > .ng-star-inserted'
    discount_number = 'input[name="discountValue"]'
    discount_type = 'select[name="discountKind"]'
    discount_submit = '#modalAddDiscount .btn-primary' 
    invoice_actions = '.btn-group > .btn'
    invoice_preview = '#page-wrapper > invoice-edit > div.wrapper.wrapper-content.ng-star-inserted > form > div > div.row.ng-star-inserted > div > div.topheader > div > ul > li:nth-child(3) > a >'
    prise_field = '.table.invoice-total.readonly >> tr.total > td' //'tr.total > td[style="color: black;"]'
    preview_prise_field = '.table.invoice-total >> tr.total > td'
    preview_variable
    importOptions = {
        
        selectAll : '.soas>>input[type="checkbox"]',
        search_input : 'input[aria-label="Search"]',
        submitImport_btn : '.soas>>>button.btn-success'

    }


    importedOrders_table = '.orders-rows'
    importedOrders = '.order-row'

    

}