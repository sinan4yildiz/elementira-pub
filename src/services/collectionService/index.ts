import { routes } from '@constants/index'
import { fetcher, route } from '@lib/utils'
import {
   CollectionServiceInterface,
   CollectionServiceToggleMethodType,
   CollectionType
} from '@services/collectionService/types'

class CollectionService implements CollectionServiceInterface {
   constructor() {}

   async list(assetType: string) {
      return await fetcher({
         url: route({ path: routes.api.account.collections.list.path }),
         method: routes.api.account.collections.list.method,
         data: {
            assetType: assetType
         }
      })
   }

   async getOne(id: string) {
      return await fetcher({
         url: route({ path: routes.api.account.collections.detail.path }),
         method: routes.api.account.collections.detail.method,
         data: {
            id: id
         }
      })
   }

   async toggle({ collection, asset }: CollectionServiceToggleMethodType) {
      return await fetcher({
         url: route({ path: routes.api.account.collections.toggle.path }),
         method: routes.api.account.collections.toggle.method,
         data: {
            collection: collection,
            asset: asset
         }
      })
   }

   async delete(collection: CollectionType) {
      return await fetcher({
         url: route({ path: routes.api.account.collections.delete.path }),
         method: routes.api.account.collections.delete.method,
         data: {
            collection: collection
         }
      })
   }
}

export default CollectionService
