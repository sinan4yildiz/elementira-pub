import { ImageProviderType, ImageSearchResultsType } from '@lib/images/types'
import { encodeStr, errorHandler, isTrue, paramVal } from '@lib/utils'

const AdobeStock: ImageProviderType = {
   name: 'AdobeStock',
   baseUrl: 'https://stock.adobe.com/uk',
   method: 'GET',
   active: true,
   json: true,
   headers: {
      Accept: 'application/json'
   },
   params: {
      sort: {
         relevant: 'relevance',
         newest: 'creation',
         popular: 'nb_downloads',
         editorsChoice: 'featured'
      },
      orientation: {
         horizontal: 'horizontal',
         vertical: 'vertical',
         square: 'square',
         panoramic: 'panoramic'
      },
      people: {
         true: undefined,
         false: undefined
      },
      numberOfPeople: {
         '1': undefined
      },
      color: {
         white: '#FFFFFF',
         black: '#000000',
         yellow: '#F1F129',
         orange: '#F48700',
         red: '#E72525',
         purple: '#7F00FF',
         magenta: '#EA06B1',
         green: '#06D506',
         teal: '#0ECB9B',
         blue: '#1F55F8'
      },
      style: {
         isolated: undefined,
         selectiveFocus: undefined,
         vibrance: undefined,
         grayish: undefined,
         transparent: undefined
      },
      usage: {
         editorial: undefined,
         nonEditorial: undefined
      },
      undiscovered: {
         true: 'only'
      },
      licence: {
         premium: undefined
      },
      safeSearch: {
         true: '1',
         false: '0'
      }
   },
   searchResults: function (source, searchQuery) {
      const searchResults: ImageSearchResultsType = {
         provider: this.name as never,
         meta: {
            currentPage: 0,
            totalAssets: 0
         },
         assets: []
      }

      try {
         const data = source

         searchResults.meta = {
            currentPage: searchQuery?.page || 1,
            totalAssets: data.total
         }

         for (const item in data.items) {
            const asset = data.items[item]

            searchResults.assets.push({
               id: encodeStr(asset.content_url),
               assetUrl: asset.content_url,
               thumbnailUrl: asset.content_thumb_extra_large_url,
               title: asset.title,
               contributor: undefined,
               contributorUrl: undefined,
               downloadUrl: undefined,
               premium: true,
               provider: this.name as never
            })
         }
      } catch (error: any) {
         errorHandler(new Error(error))
      }

      return searchResults
   },
   searchUrl: function (params) {
      let path = `/Ajax/Search`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            k: params.keyword,
            // search_type: params.keyword ? 'usertyped' : 'recentsearch',
            'filters[content_type:image]': '1',
            'filters[content_type:photo]': '1',
            'filters[undiscovered]:': paramVal(this.params.undiscovered, params.undiscovered),
            'filters[orientation]': paramVal(this.params.orientation, params.orientation),
            // 'filters[pixels_width_min]': params.minWidth,
            // 'filters[pixels_height_min]': params.minHeight,
            safe_search: paramVal(this.params.safeSearch, params.safeSearch) ?? this.params.safeSearch?.true,
            color: paramVal(this.params.color, params.color),
            order: paramVal(this.params.sort, params.sort) ?? this.params.sort?.relevant,
            limit: params.limit,
            search_page: params.page
         }

      for (const param in validParams) {
         const value = validParams[param]

         if (value) queryParams.set(param, value)
      }

      // People
      switch (isTrue(params.people)) {
         case true:
            queryParams.set('filters[releases:is_include]', '1')
            break
         case false:
            queryParams.set('filters[releases:is_exclude]', '1')
            break
      }

      // Usage
      switch (params.usage) {
         case 'editorial':
            queryParams.set('filters[illustrative]', 'include')
            break
         case 'nonEditorial':
            queryParams.set('filters[illustrative]', 'exclude')
            break
      }

      // Style
      switch (params.style) {
         case 'isolated':
            queryParams.set('filters[isolated]', 'only')
            break
         case 'selectiveFocus':
            queryParams.set('scoring[ae_depth_of_field]', '4')
            break
         case 'vibrance':
            queryParams.set('scoring[ae_vivid_color]', '4')
            break
         case 'grayish':
            queryParams.set('scoring[ae_vivid_color]', '-4')
            break
         case 'transparent':
            queryParams.set('filters[transparent]', 'only')
            break
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default AdobeStock
