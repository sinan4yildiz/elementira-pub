import './commands'

Cypress.on('uncaught:exception', err => {
   if (err.name === 'AbortError') {
      return false
   }
})
