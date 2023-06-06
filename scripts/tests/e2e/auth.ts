require('@scripts/init')

import TestService from '@services/testService'

const testService = new TestService({ spec: 'cypress/e2e/auth/e2eAuth.cy.ts' })

testService.run().finally(() => {
   process.exit()
})
