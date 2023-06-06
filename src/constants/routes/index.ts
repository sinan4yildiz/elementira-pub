import { ApiRoutesType, PageRoutesType, RoutesType } from '@constants/routes/types'

const pageRoutes: PageRoutesType = {
   home: '/',
   images: '/images',
   video: '/video',
   music: '/music',
   soundEffects: '/sound-effects',
   graphics: '/graphics',
   templates: '/templates',
   search: '/search',
   account: {
      index: '/account',
      likes: '/account/likes',
      collections: {
         list: '/account/collections',
         detail: '/account/collections/:id'
      },
      profile: '/account/profile',
      signIn: '/account/sign-in',
      signUp: '/account/sign-up'
   },
   howItWorks: '/how-it-works',
   about: '/about',
   contact: '/contact',
   licence: '/licence',
   privacyPolicy: '/privacy-policy',
   termsOfUse: '/terms-of-use',
   cookies: '/cookies'
}

const apiRoutes: ApiRoutesType = {
   search: {
      results: {
         path: '/api/search/:assetType/:provider',
         method: 'POST'
      },
      autocomplete: {
         path: '/api/search/autocomplete',
         method: 'GET'
      },
      relatedKeywords: {
         path: '/api/search/related-keywords',
         method: 'GET'
      }
   },
   account: {
      likes: {
         list: {
            path: '/api/account/likes',
            method: 'GET'
         },
         toggle: {
            path: '/api/account/likes',
            method: 'POST'
         }
      },
      collections: {
         list: {
            path: '/api/account/collections',
            method: 'GET'
         },
         detail: {
            path: '/api/account/collections',
            method: 'GET'
         },
         create: {
            path: '/api/account/collections',
            method: 'POST'
         },
         update: {
            path: '/api/account/collections',
            method: 'PATCH'
         },
         toggle: {
            path: '/api/account/collections',
            method: 'PUT'
         },
         delete: {
            path: '/api/account/collections',
            method: 'DELETE'
         }
      },
      searches: {
         recent: {
            path: '/api/account/searches',
            method: 'GET'
         },
         clear: {
            path: '/api/account/searches',
            method: 'DELETE'
         }
      },
      profile: {
         update: {
            path: '/api/account/profile',
            method: 'POST'
         }
      },
      signIn: {
         path: '/api/account/sign-in',
         method: 'POST'
      },
      signUp: {
         path: '/api/account/sign-up',
         method: 'POST'
      },
      resetPassword: {
         path: '/api/account/reset-password',
         method: 'POST'
      }
   },
   log: {
      create: {
         path: '/api/log',
         method: 'POST'
      }
   }
}

const routes: RoutesType = {
   page: pageRoutes,
   api: apiRoutes
}

export default routes
