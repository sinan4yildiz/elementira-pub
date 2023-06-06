import { test } from '@constants/index'

Cypress.Commands.add('element', selector => {
   cy.get(`[data-test-id="${test.elements[selector]?.id}"]`)
})

Cypress.Commands.add('expectSearchResults', () => {
   cy.wait(1000).element('searchResults').find('article > ul > li').should('have.length.gte', 10)
})
