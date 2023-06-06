import { GraphicProviderType, GraphicSearchResultsType } from '@lib/graphics/types'
import { arrayUnique, encodeStr, errorHandler, isFilled, paramVal } from '@lib/utils'

const EnvatoGraphics: GraphicProviderType = {
   name: 'EnvatoGraphics',
   baseUrl: 'https://elements.envato.com',
   method: 'GET',
   active: true,
   json: true,
   headers: {
      Accept: 'application/json'
   },
   params: {
      sort: {
         newest: 'sort-by-latest',
         popular: 'sort-by-popular'
      },
      type: {
         vectors: undefined,
         illustrations: undefined
      },
      fileType: {
         psd: 'adobe-photoshop',
         ai: 'adobe-illustrator',
         figma: 'figma',
         sketch: 'sketch'
      },
      licence: {
         premium: undefined
      }
   },
   searchResults: function (source) {
      const searchResults: GraphicSearchResultsType = {
         provider: this.name as never,
         meta: {
            currentPage: 0,
            totalAssets: 0
         },
         assets: []
      }

      try {
         const data = source.data

         searchResults.meta = {
            currentPage: data.pagination.currentPage,
            totalAssets: data.totalItems
         }

         data.items.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.id),
               assetUrl: `${this.baseUrl}/${asset.slug}-${asset.id}`,
               thumbnailUrl: asset.coverImage.w632,
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
      let path = `/internal-data-page`,
         pathParams = ['/graphics', params.keyword]

      if (params.sort) {
         pathParams.push(paramVal(this.params.sort, params.sort))
      }

      if (isFilled(params.fileType)) {
         pathParams.push(`compatible-with-${paramVal(this.params.fileType, params.fileType).join('+')}`)
      }

      if (params.page) {
         pathParams.push(`pg-${params.page}`)
      }

      const queryParams = new URLSearchParams(),
         validParams: any = {
            path: encodeURI(arrayUnique(pathParams as []).join('/'))
         }

      for (const param in validParams) {
         const value = validParams[param]

         if (value) queryParams.set(param, value)
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default EnvatoGraphics
