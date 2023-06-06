import { ImageProviderType, ImageSearchResultsType } from '@lib/images/types'
import { encodeStr, errorHandler, isTrue, paramVal, parseDOM } from '@lib/utils'

const Freepik: ImageProviderType = {
   name: 'Freepik',
   baseUrl: 'https://www.freepik.com',
   method: 'GET',
   active: true,
   headers: {
      Accept: 'text/html'
   },
   params: {
      sort: {
         newest: 'recent'
      },
      orientation: {
         horizontal: 'landscape',
         vertical: 'portrait',
         square: 'square',
         panoramic: 'panoramic'
      },
      age: {
         infants: 'toddler',
         children: 'child',
         teenagers: 'teen',
         '20': 'young',
         '30': 'adult',
         '40': 'adult',
         '50': 'senior',
         '60': 'senior',
         older: 'elder'
      },
      gender: {
         female: 'feminine',
         male: 'masculine'
      },
      people: {
         true: 'include',
         false: 'exclude'
      },
      numberOfPeople: {
         '1': '1',
         '2': '2',
         '3': '3',
         '4': '4',
         more: '4'
      },
      ethnicity: {
         african: 'black',
         africanAmerican: 'black',
         black: 'black',
         brazilian: 'hispanic',
         caucasian: 'caucasian',
         eastAsian: 'eastasian',
         hispanic: 'hispanic',
         indian: 'indian',
         middleEastern: 'middleeastern',
         nativeAmerican: 'white',
         pacificIslander: 'hispanic',
         southAsian: 'southasian',
         southeastAsian: 'eastasian',
         white: 'white',
         other: 'multiracial'
      },
      color: {
         white: 'white',
         black: 'black',
         yellow: 'yellow',
         orange: 'orange',
         red: 'red',
         purple: 'purple',
         magenta: 'pink',
         green: 'green',
         teal: 'cyan',
         blue: 'blue'
      },
      undiscovered: {
         true: '1',
         false: undefined
      },
      licence: {
         free: undefined,
         premium: undefined
      },
      safeSearch: {
         true: undefined,
         false: 'off'
      }
   },
   searchResults: function (source, searchQuery) {
      const DOM = parseDOM(source)

      const searchResults: ImageSearchResultsType = {
         provider: this.name as never,
         meta: {
            currentPage: 0,
            totalAssets: 0
         },
         assets: []
      }

      try {
         const currentPage = DOM.querySelector('[name="page"]')?.getAttribute('value'),
            totalAssets = DOM.querySelector('#main')?.getAttribute('data-summary-total')

         searchResults.meta = {
            currentPage: searchQuery?.page || 1,
            totalAssets: totalAssets ? parseInt(totalAssets) : 0
         }

         DOM.querySelectorAll(`.showcase__item`).forEach(asset => {
            const link = asset.querySelector(`.showcase__link`),
               image = link?.querySelector(`:scope > img`)

            const assetUrl = link?.getAttribute('href'),
               thumbnailUrl = image?.getAttribute('data-src'),
               title = image?.getAttribute('alt') ?? undefined

            if (assetUrl && thumbnailUrl) {
               searchResults.assets.push({
                  id: encodeStr(assetUrl),
                  assetUrl: assetUrl,
                  thumbnailUrl: thumbnailUrl,
                  title: title,
                  contributor: undefined,
                  contributorUrl: undefined,
                  downloadUrl: undefined,
                  premium: isTrue(asset.getAttribute('data-typology') === 'premium-contributor-pxd'),
                  provider: this.name as never
               })
            }
         })
      } catch (error: any) {
         errorHandler(new Error(error))
      }

      return searchResults
   },
   searchUrl: function (params) {
      let path = `/search`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            query: params.keyword,
            format: 'search',
            type: 'photo',
            color: paramVal(this.params.color, params.color),
            orientation: paramVal(this.params.orientation, params.orientation),
            people: paramVal(this.params.people, params.people),
            undiscovered: paramVal(this.params.undiscovered, params.undiscovered),
            demographic: [],
            order_by: paramVal(this.params.sort, params.sort),
            page: params.page
         }

      // Demographic
      if (params.numberOfPeople) {
         validParams.demographic.push(`number${paramVal(this.params.numberOfPeople, params.numberOfPeople)}`)
      }

      if (params.gender) {
         validParams.demographic.push(paramVal(this.params.gender, params.gender))
      }

      if (params.ethnicity) {
         validParams.demographic.push(paramVal(this.params.ethnicity, params.ethnicity))
      }

      if (params.age) {
         validParams.demographic.push(paramVal(this.params.age, params.age))
      }

      for (const param in validParams) {
         const value = validParams[param]

         if (value) queryParams.set(param, value)
      }

      // Licence
      switch (params.licence) {
         case 'free':
            queryParams.set('selection', '1')
            break

         case 'premium':
            queryParams.set('premium', '1')
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default Freepik
