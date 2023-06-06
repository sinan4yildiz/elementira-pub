import { TestElementKeys } from '@constants/test'
import { ImageSearchResultsType } from '@lib/images/types'

declare global {
   namespace Cypress {
      interface Chainable {
         element(selector: TestElementKeys): Chainable<any>
         expectSearchResults(): Chainable<any>
      }
   }
}
