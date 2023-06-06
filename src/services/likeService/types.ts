import { LikeSchemaInterface } from '@models/likeModel'

export interface LikeServiceInterface {
   list(assetType: string): Promise<Response>

   toggle(payload: Omit<LikeSchemaInterface, 'user' | 'createdAt'>): Promise<Response>
}

export type LikedAssetType = {
   assetType: string
   assetUrl: string
   provider: string
   user: string
}
