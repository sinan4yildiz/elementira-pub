import { ImageProviderType, ImageSearchResultsType } from '@lib/images/types'
import { encodeStr, errorHandler, isFilled, isTrue, paramVal, parseDOM } from '@lib/utils'

const DreamsTime: ImageProviderType = {
   name: 'DreamsTime',
   baseUrl: 'https://www.dreamstime.com',
   method: 'GET',
   active: true,
   headers: {
      Accept: 'text/html'
   },
   params: {
      sort: {
         newest: '8',
         popular: '6'
      },
      orientation: {
         horizontal: undefined,
         vertical: undefined,
         square: undefined,
         panoramic: undefined
      },
      age: {
         infants: 's_mra1',
         children: 's_mra2',
         teenagers: 's_mra4',
         '20': 's_mra5',
         '30': 's_mra6',
         '40': 's_mra7',
         '50': 's_mra8',
         '60': 's_mra8',
         older: 's_mra9'
      },
      gender: {
         female: '2',
         male: '3'
      },
      people: {
         true: undefined,
         false: undefined
      },
      numberOfPeople: {
         '1': 's_mrc1',
         '2': 's_mrc2',
         '3': 's_mrc3',
         '4': 's_mrc4',
         more: 's_mrc5'
      },
      ethnicity: {
         african: 's_mreb',
         africanAmerican: 's_mreb',
         brazilian: 's_mreh',
         chinese: 's_mrea',
         caucasian: 's_mrec',
         eastAsian: 's_mrea',
         hispanic: 's_mreh',
         japanese: 's_mrea',
         middleEastern: 's_mreo',
         nativeAmerican: 's_mrec',
         pacificIslander: 's_mreo',
         southAsian: 's_mrea',
         southeastAsian: 's_mrea',
         multiracial: 's_mrem',
         other: 's_mreo'
      },
      color: {
         white: 'FFFFFF',
         black: '000000',
         yellow: 'F1F129',
         orange: 'F48700',
         red: 'E72525',
         purple: '7F00FF',
         magenta: 'EA06B1',
         green: '06D506',
         teal: '0ECB9B',
         blue: '1F55F8'
      },
      size: {
         small: undefined,
         medium: undefined,
         large: undefined,
         xLarge: undefined,
         xxLarge: undefined,
         xxxLarge: undefined
      },
      licence: {
         premium: undefined
      },
      usage: {
         editorial: undefined
      },
      exclude: undefined
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
         const totalAssets = DOM.querySelector('h1')?.innerHTML.split(' ')[0].replace(/\D/g, '')

         searchResults.meta = {
            currentPage: searchQuery?.page || 1,
            totalAssets: totalAssets ? parseInt(totalAssets) : 0
         }

         DOM.querySelectorAll('.item-list-container > .item').forEach(asset => {
            const image = asset.querySelector(`.item__thumb`),
               link = asset.querySelector(`.item__url`)

            const assetUrl = link?.getAttribute('href'),
               thumbnailUrl = image?.getAttribute('src'),
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
                  premium: true,
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
      let path = `/search.php`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            srh_field: params.keyword || 'photo',
            sortcriteria: paramVal(this.params.sort, params.sort),
            s_color1: paramVal(this.params.color, params.color), // color
            s_percent1: paramVal(this.params.color, params.color) ? 20 : undefined, // color density
            s_c1e: paramVal(this.params.color, params.color) ? 'y' : undefined, // color primary
            s_mrg: paramVal(this.params.gender, params.gender), // gender
            s_ph: 'y', // photos
            s_orl: params.orientation === 'horizontal' ? 'y' : undefined, // horizontal
            s_orp: params.orientation === 'vertical' ? 'y' : undefined, // vertical
            s_ors: params.orientation === 'square' ? 'y' : undefined, // square
            s_orw: params.orientation === 'panoramic' ? 'y' : undefined, // panoramic
            s_rsf: '0', // size min
            s_rst: '7', // size max
            s_exc: params.exclude,
            pg: params.page
         }

      for (const param in validParams) {
         const value = validParams[param]

         if (value) queryParams.set(param, value)
      }

      // Ethnicities
      if (isFilled(params.ethnicity)) {
         for (const param of paramVal(this.params.ethnicity, params.ethnicity)) {
            queryParams.set(param, 'y')
         }
      } else {
         for (const key in this.params.ethnicity) {
            queryParams.set(this.params.ethnicity[key as never], 'y')
         }
      }

      // Age
      for (const param of paramVal(this.params.age, params.age) ?? []) {
         queryParams.set(param, 'y')
      }

      // Number of people
      if (params.numberOfPeople) {
         queryParams.set(paramVal(this.params.numberOfPeople, params.numberOfPeople), 'y')
      }

      // People
      if (params.people) {
         if (isTrue(params.people)) {
            queryParams.set('s_op', 'y')
            queryParams.set('s_mr', 'y')
         } else {
            queryParams.set('s_wp', 'y')
         }
      }

      // Editorial
      if (params.usage === 'editorial') {
         queryParams.set('s_ed', 'y')
      }

      // Size
      switch (params.size) {
         case 'small':
         case 'medium':
            queryParams.set('s_rsf', '0')
            queryParams.set('s_rst', '2')
            break

         case 'large':
         case 'xLarge':
            queryParams.set('s_rsf', '2')
            queryParams.set('s_rst', '3')
            break

         case 'xxLarge':
            queryParams.set('s_rsf', '3')
            queryParams.set('s_rst', '5')
            break

         case 'xxxLarge':
            queryParams.set('s_rsf', '5')
            queryParams.set('s_rst', '7')
            break
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default DreamsTime
