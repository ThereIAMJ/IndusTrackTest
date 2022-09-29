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
    random_item = '.mat-option.mat-focus-indicator.ng-star-inserted'
    dublicate = '.mat-dialog-container#mat-dialog-0'
    dupl_button = 'button.mat-focus-indicator.btn.btn-primary.mat-button.mat-button-base._mat-animation-noopable.ng-star-inserted'
    discount_add = 'tr.ng-star-inserted > :nth-child(2) > .ng-star-inserted'
    discount_number = 'input[name="discountValue"]'
    discount_type = 'select[name="discountKind"]'
    discount_submit = '#modalAddDiscount .btn-primary' 
    invoice_actions = '.btn-group > .btn'
    invoice_preview = 'div > ul > li:nth-child(3) > a' 
    prise_field = '.table.invoice-total.readonly >> tr.total > td' 
    preview_prise_field = '.table.invoice-total >> tr.total > td'

    //iFrame

    iFrameBody = '#contentHolder'
    iFrameClosebutton = 'button.mat-focus-indicator.btn.btn-white.mat-button.mat-button-base._mat-animation-noopable'
    invoice_delete = 'div > ul > li:nth-child(11) > a'
    invoice_delete_confirm = ('button.mat-focus-indicator.btn.btn-primary.mat-button.mat-button-base._mat-animation-noopable.ng-star-inserted')

}