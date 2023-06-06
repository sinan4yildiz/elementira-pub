import app from '@constants/app'
import { errorLogger } from '@lib/serverUtils'
import { isFilled, trans } from '@lib/utils'
import mongoDB from '@middleware/mongodb'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { CollectionAssetRepository, CollectionRepository } from '@repository/index'
import { CollectionCreateFormFieldsType } from '@services/collectionService/types'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import validator from 'validator'

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
   const collectionRepo = new CollectionRepository()
   const collectionAssetRepo = new CollectionAssetRepository()
   const validationErrors: Partial<CollectionCreateFormFieldsType> = {}
   const session = await getServerSession(req, res, authOptions)
   const token = (await getToken({ req, secret: authOptions.secret }))?.sub as never

   if (!session || !token) {
      return res.status(401).send({})
   }

   const List = async () => {
      const list = await collectionRepo.list(req.query.assetType as string, token)

      return res.status(200).send(list)
   }

   const Detail = async () => {
      const { id } = req.query

      try {
         const collection = await collectionRepo.find({
            _id: id,
            user: token
         })

         if (collection) return res.status(200).send(collection)
      } catch (error: any) {}

      return res.status(404).send({})
   }

   const Create = async () => {
      const { name, assetType } = req.body

      if (!app.assets.hasOwnProperty(assetType)) {
         throw Error(trans('errors.generic'))
      }

      if (validator.isEmpty(name)) {
         validationErrors.name = trans('errors.validation.required')
      } else if (await collectionRepo.find({ name: name, user: token })) {
         validationErrors.name = trans('errors.validation.alreadyInUse')
      }

      if (isFilled(validationErrors)) {
         return res.status(422).send(validationErrors)
      }

      const createdCollection = await collectionRepo.create({
         name: name,
         assetType: assetType,
         user: token
      })

      return res.status(200).send({
         created: createdCollection,
         list: await collectionRepo.list(assetType, token)
      })
   }

   const Update = async () => {
      const { id, name } = req.body

      const collection = await collectionRepo.find({
         _id: id,
         user: token
      })

      if (!collection) {
         throw Error(trans('errors.generic'))
      }

      if (validator.isEmpty(name)) {
         validationErrors.name = trans('errors.validation.required')
      } else if (await collectionRepo.find({ _id: { $ne: id }, name: name, user: token })) {
         validationErrors.name = trans('errors.validation.alreadyInUse')
      }

      if (isFilled(validationErrors)) {
         return res.status(422).send(validationErrors)
      }

      await collection.update({
         name: name
      })

      return res.status(200).send(await collectionRepo.list(collection.assetType, token))
   }

   const Toggle = async () => {
      let { collection, asset } = req.body

      collection = await collectionRepo.find({
         _id: collection._id,
         user: token
      })

      if (!collection) {
         throw Error(trans('errors.generic'))
      }

      const isSaved = await collectionAssetRepo.find({
         relatedCollection: collection._id,
         provider: asset.provider,
         assetType: collection.assetType,
         assetUrl: asset.assetUrl
      })

      if (isSaved) {
         await isSaved.delete()
      } else {
         await collectionAssetRepo.create({
            relatedCollection: collection._id,
            asset: JSON.stringify(asset),
            provider: asset.provider,
            assetType: collection.assetType,
            assetUrl: asset.assetUrl
         })
      }

      return res.status(200).send(await collectionRepo.list(collection.assetType, token))
   }

   const Delete = async () => {
      const { collection } = req.body

      const userCollection = await collectionRepo.find({
         _id: collection._id,
         user: token
      })

      if (userCollection) {
         await userCollection.deleteOne()

         await collectionAssetRepo.delete({ relatedCollection: collection._id })
      }

      return res.status(200).send(await collectionRepo.list(collection.assetType, token))
   }

   try {
      switch (req.method) {
         case 'GET':
            const { id } = req.query

            if (id) return Detail()
            else return List()

         case 'POST':
            return Create()

         case 'PATCH':
            return Update()

         case 'PUT':
            return Toggle()

         case 'DELETE':
            return Delete()

         default:
            return res.status(405).send({ error: trans('errors.methodNotAllowed') })
      }
   } catch (error: any) {
      void errorLogger({
         name: error.name,
         stack: error.stack,
         message: error.message,
         context: JSON.stringify(req.body),
         path: req.url
      })

      return res.status(500).send({ error: trans('errors.generic') })
   }
}

export default mongoDB(controller)
