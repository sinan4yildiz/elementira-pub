import { env } from '@constants/index'

beforeEach(() => {
   cy.setCookie('cookieConsent', 'true')

   cy.stub(env, 'public').value(Cypress.env('public'))
})
