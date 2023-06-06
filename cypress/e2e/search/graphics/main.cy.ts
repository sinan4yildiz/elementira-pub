import { routes } from '@constants/index'
import '@cypress/support/stubs'
import { route } from '@lib/utils'

console.clear()

const searchKeyword = 'blue sky'

describe('Graphic search', () => {
   context('without keyword', () => {
      it('performs a basic search', () => {
         cy.visit(route({ path: routes.page.graphics, host: true }))

         cy.element('searchForm').submit().expectSearchResults()
      })
   })

   context('with keyword', () => {
      it('performs a basic search and tests several interactions', () => {
         cy.intercept({
            method: routes.api.search.autocomplete.method,
            url: `${routes.api.search.autocomplete.path}*`
         }).as('autocomplete')

         cy.visit(route({ path: routes.page.graphics, host: true }))

         cy.element('searchForm').find('input[name="keyword"]').type(searchKeyword)

         // Autocomplete
         cy.wait('@autocomplete')
            .then(interception => {
               const response = interception.response

               expect(response?.statusCode).equal(200)

               expect(response?.body).not.empty

               const autocompleteEl = cy.element('searchFormAutocomplete')

               autocompleteEl.find('ul > li').each((item, index) => {
                  expect(response?.body[index].keyword).eq(item.text())
               })

               autocompleteEl.first().find('a').click().expectSearchResults()
            })
            .wait(500)

         // Free
         cy.element('searchLicenceFilter').find('button').eq(1).click().expectSearchResults().wait(500)

         // Premium
         cy.element('searchLicenceFilter').find('button').eq(2).click().expectSearchResults().wait(500)

         // All
         cy.element('searchLicenceFilter').find('button').eq(0).click().expectSearchResults().wait(500)

         // Provider filter
         cy.element('searchProviderFilterButton').click()

         cy.element('searchProviderFilterList')
            .find('li > ul > li')
            .each((provider, index) => {
               if (index < 3) cy.wrap(provider).click()
            })

         cy.element('searchProviderFilterApplyButton').click().expectSearchResults().wait(500)

         // Related keywords
         cy.element('searchRelatedKeywords').find('a').first().click().expectSearchResults()
      })
   })
})
