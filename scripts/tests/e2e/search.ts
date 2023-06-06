require('@scripts/init')

import TestService from '@services/testService'

const testService = new TestService({ spec: 'cypress/e2e/search/**/*' })

testService.run().finally(() => {
   process.exit()
})
