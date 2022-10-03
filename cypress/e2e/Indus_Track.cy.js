/// <reference types="cypress" />

import {
   PageElements
} from "../support/selectors"

const pe = new PageElements()

describe('Indus Track Test', () => {
   beforeEach(() => {
      cy.visit('/')
      Cypress.on('uncaught:exception', (err, runnable) => {
         return false
      })
      cy.clearLocalStorage()
   })

   it('New Invoice Test', () => {
      cy.loginForm(Cypress.env('users').admin["username"], Cypress.env('users').admin["password"])
      cy.selectCustomer("agape", "Agape Mechanical")
      cy.setUpInvoice(10, 0)// discound amount, discount type [0 - %; 1 - $]
      cy.comparePrice()
      cy.deleteDraftInvoice()

   })
})

      /**  -> UPDATE

   1. все виконується в одній команди тому потрібно розбити 
      декілька команд щоб була можливість в подальшому їх використовувати 
      для комбінації в інших тестах:

      - login()
      - navigate()
      - createNewInvoice()
      - openPreview()
      - deleteDraftInvoice() ! це одна з опцій яку можна виконати тому її потрібно окремо викликати + сценарій стає читабельним
      - ...

   2. назва it('...') має бути змістовна, це як назва тест кейсу

   3. забагато лишніх команд:
      - agapeSelector()
      - newRandomItem()
      - iFrameValidation()
      - proceedButValidation()
      - agapeFieldValidation()
      - ...

      ! команда це метод а суть методів щоб вони були максимально реюзабельні і назви їх змістовно зрозумілі
      ! команди(як і методи) в ідеалі мають щось приймати наприклад -> login(email, password)
         і звідси випливає що я можу використовувати цю команду в інших тестах з іншими даними
      ! також старатися уникати виклику команди в команді без нагальної потреби

   4. (до пункту 3) НЕ потрібно створювати окремі команди для перевірки API запитів, їх потрібно відловлювати в кроках 
      так як це один з [steps to reproduce]

   5. cy.url().should('eq', 'https://onetrackui.azurewebsites.net/invoicesTab/overview/0') 
      - ! при перевірці лінки при переході по сторінках використовувати cy.location()

   6. cy.get(pe.discount_number).clear().type('10') 
      - ! розмір і тип знижки це один з тестових параметрів, який бажано вказувати в тілі тесту it('...){}
         або ж один з параметрів які буде приймати наприклад команда setDiscount(type[%, $], amount[0 - 100%, 0 - maxTotalPrice])

   7. суть тестів це просто виконання кроків а й ПЕРЕВІКИ (assertions) в тебе їх всього 9 на 100 кроків 
      - ! шось зробив/створив -> напиши перевірку (15-20/100 нормально)

   */

