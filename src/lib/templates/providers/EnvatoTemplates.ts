import { TemplateProviderType, TemplateSearchResultsType } from '@lib/templates/types'
import { arrayUnique, encodeStr, errorHandler, paramVal } from '@lib/utils'

const EnvatoTemplates: TemplateProviderType = {
   name: 'EnvatoTemplates',
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
         const data = source.data

         searchResults.meta = {
            currentPage: data.pagination.currentPage,
            totalAssets: data.totalItems
         }

         data.items.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.id),
               assetUrl: `${this.baseUrl}/${asset.slug}-${asset.id}`,
               thumbnailUrl: asset.coverImage.w710,
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
         pathParams = ['/presentation-templates', params.keyword]

      if (params.sort) {
         pathParams.push(paramVal(this.params.sort, params.sort))
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

export default EnvatoTemplates
