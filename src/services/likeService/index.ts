import { routes } from '@constants/index'
import { fetcher, route } from '@lib/utils'
import { LikeSchemaInterface } from '@models/likeModel'
import { LikeServiceInterface } from '@services/likeService/types'

class LikeService implements LikeServiceInterface {
   constructor() {}

   async list(assetType: string) {
      return await fetcher({
         url: route({ path: routes.api.account.likes.list.path }),
         method: routes.api.account.likes.list.method,
         data: {
            assetType: assetType
         }
      })
   }

   async toggle(data: Pick<LikeSchemaInterface, 'assetType' | 'asset'>) {
      return await fetcher({
         url: route({ path: routes.api.account.likes.toggle.path }),
         method: routes.api.account.likes.toggle.method,
         data: data
      })
   }
}

export default LikeService
