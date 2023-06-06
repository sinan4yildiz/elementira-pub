import { TemplateProviderType, TemplateSearchResultsType } from '@lib/templates/types'
import { encodeStr, errorHandler, paramVal } from '@lib/utils'

const CreativeMarket: TemplateProviderType = {
   name: 'CreativeMarket',
   baseUrl: 'https://creativemarket.com',
   method: 'GET',
   active: true,
   proxy: true,
   json: true,
   headers: {
      'X-Requested-With': 'XMLHttpRequest'
   },
   params: {
      sort: {
         newest: 'newest',
         relevant: 'relevant',
         random: 'random',
         popular: undefined
      },
      category: {
         banner: '207',
         branding: '208',
         businessCard: '210',
         card: '211',
         etsy: '283',
         instagram: '240',
         facebook: '222',
         youtube: '254',
         pinterest: '263',
         flyer: '225',
         entertainment: '226',
         logo: '249',
         advertisement: '354',
         postcard: '275',
         poster: '251',
         presentation: '310'
      },
      licence: {
         premium: undefined
      }
   },
   searchResults: function (source) {
      const searchResults: TemplateSearchResultsType = {
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
            currentPage: data.pagination.currentPage,
            totalAssets: data.pagination.totalResults
         }

         data.products.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.id),
               assetUrl: asset.url,
               thumbnailUrl: asset.thumbnail.l,
               title: asset.title,
               downloadUrl: undefined,
               premium: true,
               provider: this.name as never
            })
         })
      } catch (error: any) {
         errorHandler(new Error(error))
      }

      return searchResults
   },
   searchUrl: function (params) {
      let path = `/search/${params.keyword?.replace(' ', '-') || ''}`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            categoryIDs: 2,
            category: paramVal(this.params.category, params.category),
            sort: paramVal(this.params.sort, params.sort),
            page: params.page
         }

      for (const param in validParams) {
         const value = validParams[param]

         switch (typeof value) {
            case 'object':
               for (const multiple of value) queryParams.append(param, multiple)
               break

            case 'string':
               queryParams.set(param, value)
               break

            case 'number':
               queryParams.set(param, value.toString())
         }
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default CreativeMarket
