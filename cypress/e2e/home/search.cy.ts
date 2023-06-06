import { routes } from '@constants/index'
import '@cypress/support/stubs'
import { route } from '@lib/utils'

console.clear()

const searchKeyword = 'deep ocean'

describe('Home page', () => {
   it('Loads the home page and performs a search', () => {
      cy.visit(route({ path: routes.page.home, host: true }))

      cy.element('searchForm').find('input[name="keyword"]').type(`${searchKeyword}{enter}`)

      cy.expectSearchResults()
   })
})
