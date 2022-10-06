/// <reference types="cypress" />

export class PageElements {

    //------- Login Form

    loginForm = '.mat-focus-indicator'
    email_input = '#mat-input-0'
    password_input = '#mat-input-1'
    submitLogin_btn = '.mat-focus-indicator'

    //------- Header Menu
    
    header_menu = '.navbar-nav'

    //------- Invoice customer

    new_invoice = 'button[class="btn btn-sm btn-primary m-r-sm ng-star-inserted"]'
    aMechanical = '[@b _ngcontent-wly-c382="">Agape Mechanical]'
    proceed_but = 'button.btn.btn-primary.m-r-sm'

    //------- Invoice setup

    search_field = '#mat-input-6'
    random_item = '.mat-option.mat-focus-indicator.ng-star-inserted'
    discount_add = 'a[class="ng-star-inserted"]'
    discount_number = 'div.row > div.form-group >> input'
    discount_type = 'div.row > div.form-group >> select'
    discount_submit = 'div > div.modal-footer > button.btn.btn-primary' 
    invoice_actions = '.btn-group > .btn'
    invoice_preview = 'div > ul > li:nth-child(3) > a' 
    prise_field = '.table.invoice-total.readonly >> tr.total > td' 
    preview_prise_field = '.table.invoice-total >> tr.total > td'

    //iFrame

    iFrameBody = '#contentHolder'
    iFrameClosebutton = 'button.mat-focus-indicator.btn.btn-white.mat-button.mat-button-base._mat-animation-noopable'

    //delete

    invoice_delete = 'div > ul > li > a > i[class="far fa-trash-alt"'
    invoice_delete_confirm = 'button.mat-focus-indicator.btn.btn-primary.mat-button.mat-button-base._mat-animation-noopable.ng-star-inserted'

}