require('dotenv').config({
   path: `.env.local`
})

import { defineConfig } from 'cypress'
import env from './src/constants/env'

export default defineConfig({
   projectId: 'ude86r',
   chromeWebSecurity: false,
   blockHosts: ['*.googletagmanager.com', '*.google-analytics.com'],
   env: {
      public: env.public
   },
   e2e: {
      setupNodeEvents(on, config) {}
   },
   component: {
      devServer: {
         framework: 'next',
         bundler: 'webpack'
      }
   },
   video: true
})
