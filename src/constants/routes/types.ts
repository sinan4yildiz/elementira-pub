export type PagesType<T = object> = {
   home: T
   images: T
   video: T
   music: T
   soundEffects: T
   templates: T
   graphics: T
   search: T
   account: {
      index: T
      profile: T
      likes: T
      collections: {
         list: T
         detail: T
      }
      signUp: T
      signIn: T
   }
   howItWorks: T
   about: T
   contact: T
   licence: T
   privacyPolicy: T
   termsOfUse: T
   cookies: T
}

export type PageRoutesType = PagesType<string>

export type ApiRouteType = {
   path: string
   method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
}

export type ApiRoutesType<T = ApiRouteType> = {
   search: {
      results: T
      autocomplete: T
      relatedKeywords: T
   }
   account: {
      likes: {
         list: T
         toggle: T
      }
      collections: {
         list: T
         detail: T
         create: T
         update: T
         toggle: T
         delete: T
      }
      searches: {
         recent: T
         clear: T
      }
      profile: {
         update: T
      }
      signIn: T
      signUp: T
      resetPassword: T
   }
   log: {
      create: T
   }
}

export type RoutesType = {
   page: PageRoutesType
   api: ApiRoutesType
}
