module.exports = {
   apps: [
      {
         name: 'elementira-app',
         exec_mode: 'cluster',
         instances: '1',
         script: 'server.ts',
         env: {
            NODE_ENV: 'production'
         }
      },
      {
         name: 'elementira-cron',
         exec_mode: 'cluster',
         instances: '1',
         script: 'scripts/cron.ts',
         watch: ['scripts']
      }
   ]
}
