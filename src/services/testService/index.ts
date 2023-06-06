import { LogRepository } from '@repository/index'
import { TestServiceInterface } from '@services/testService/types'
import cypress from 'cypress'

class TestService implements TestServiceInterface {
   public readonly options: Partial<CypressCommandLine.CypressRunOptions>

   constructor(options: Partial<CypressCommandLine.CypressRunOptions>) {
      this.options = {
         browser: 'electron',
         /*reporter: 'mochawesome',
         reporterOptions: {
            reportDir: 'cypress/reports',
            reportFilename: '[name]-[status]-[datetime]',
            timestamp: 'yyyy.mm.dd_HH-MM',
            overwrite: false,
            html: false,
            json: true
         },*/
         ...options
      }
   }

   async run(): Promise<void> {
      const logRepo = new LogRepository()

      await cypress
         .run(this.options)
         .then(async (results: any) => {
            await logRepo.create({
               name: 'TestResults',
               stack: JSON.stringify(results),
               message: 'Failure'
            })
         })
         .catch(async error => {
            await logRepo.create({
               name: error.name,
               stack: error.stack,
               message: error.message,
               context: error.context,
               path: error.path
            })
         })
         .finally(() => {})
   }
}

export default TestService
