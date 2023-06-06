require('@scripts/init')

import { sleep } from '@lib/utils'
import { LogRepository } from '@repository/index'
import { graphicProvidersTest } from '@scripts/tests/providers/graphics'
import { imageProvidersTest } from '@scripts/tests/providers/images'
import { musicProvidersTest } from '@scripts/tests/providers/music'
import { soundEffectProvidersTest } from '@scripts/tests/providers/soundEffects'
import { templateProvidersTest } from '@scripts/tests/providers/templates'
import { videoProvidersTest } from '@scripts/tests/providers/video'
import { cacheMethods } from './db/cache'

const { CronJob } = require('cron')

const logRepo = new LogRepository()

const jobs = [
   /*
    * Purge cache
    * */
   new CronJob(
      '*/30 * * * *',
      async () => {
         await cacheMethods.purge()

         await logRepo.create({
            name: 'CronLog',
            message: 'Cache purge command executed.'
         })
      },
      async () => {},
      true,
      'Europe/London'
   ),

   /*
    * Provider tests
    * */
   new CronJob(
      '0 6,18 * * *',
      async () => {
         console.info(' \nImages')
         await Promise.all(imageProvidersTest())
         await sleep(2000)

         console.info(' \nVideo')
         await Promise.all(videoProvidersTest())
         await sleep(2000)

         console.info(' \nMusic')
         await Promise.all(musicProvidersTest())
         await sleep(2000)

         console.info(' \nSound effects')
         await Promise.all(soundEffectProvidersTest())
         await sleep(2000)

         console.info(' \nGraphics')
         await Promise.all(graphicProvidersTest())
         await sleep(2000)

         console.info(' \nTemplates')
         await Promise.all(templateProvidersTest())

         await logRepo.create({
            name: 'CronLog',
            message: 'Provider tests ran.'
         })
      },
      async () => {},
      true,
      'Europe/London'
   )
]

jobs.map(job => job.start())
