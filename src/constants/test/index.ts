export type TestElementKeys =
   | 'searchForm'
   | 'searchFormAutocomplete'
   | 'searchResults'
   | 'searchLicenceFilter'
   | 'searchFiltersButton'
   | 'searchProviderFilterButton'
   | 'searchProviderFilterList'
   | 'searchProviderFilterApplyButton'
   | 'searchRelatedKeywords'
   | 'userMenu'
   | 'signUpForm'
   | 'signInForm'
   | 'signOutButton'
   | 'resetPasswordButton'
   | 'resetPasswordForm'

export type TestElementsType = {
   [K in TestElementKeys]: TestElementType
}

export type TestElementType = {
   id: string
}

const elements: TestElementsType = {
   searchForm: {
      id: 'searchForm'
   },
   searchFormAutocomplete: {
      id: 'searchFormAutocomplete'
   },
   searchResults: {
      id: 'searchResults'
   },
   searchLicenceFilter: {
      id: 'searchLicenceFilter'
   },
   searchFiltersButton: {
      id: 'searchFiltersButton'
   },
   searchProviderFilterButton: {
      id: 'searchProviderFilterButton'
   },
   searchProviderFilterList: {
      id: 'searchProviderFilterList'
   },
   searchProviderFilterApplyButton: {
      id: 'searchProviderFilterApplyButton'
   },
   searchRelatedKeywords: {
      id: 'searchRelatedKeywords'
   },
   userMenu: {
      id: 'userMenu'
   },
   signUpForm: {
      id: 'signUpForm'
   },
   signInForm: {
      id: 'signInForm'
   },
   signOutButton: {
      id: 'signOutButton'
   },
   resetPasswordButton: {
      id: 'resetPasswordButton'
   },
   resetPasswordForm: {
      id: 'resetPasswordForm'
   }
}

const test = {
   elements: elements
}

export default test
