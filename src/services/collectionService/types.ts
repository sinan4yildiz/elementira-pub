import { AnySearchResultsAssetType } from '@lib/types'
import { CollectionAssetSchemaInterface } from '@models/collectionAssetModel'
import { CollectionSchemaInterface } from '@models/collectionModel'
import { HydratedDocument } from 'mongoose'

export interface CollectionServiceInterface {
   list(assetType: string): Promise<Response>

   getOne(id: string): Promise<Response>

   toggle({ collection, asset }: CollectionServiceToggleMethodType): Promise<Response>

   delete(collection: CollectionType): Promise<Response>
}

export type CollectionServiceToggleMethodType = {
   collection: CollectionSchemaInterface
   asset: AnySearchResultsAssetType
}

export type CollectionType = HydratedDocument<CollectionSchemaInterface> & {
   assets: HydratedDocument<CollectionAssetSchemaInterface>[]
}

export type CollectionCreateFormFieldsType = {
   name: string
   assetType: string
}

export type CollectionUpdateFormFieldsType = {
   _id: string
   name: string
}
