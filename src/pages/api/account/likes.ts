import { errorLogger } from '@lib/serverUtils'
import { trans } from '@lib/utils'
import mongoDB from '@middleware/mongodb'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { LikeRepository } from '@repository/index'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
   try {
      const likeRepo = new LikeRepository()
      const session = await getServerSession(req, res, authOptions)
      const token = (await getToken({ req, secret: authOptions.secret }))?.sub as never

      if (!session || !token) {
         return res.status(401).send({})
      }

      const List = async () => {
         const list = await likeRepo.list(req.query.assetType as string, token)

         return res.status(200).send(list)
      }

      const Toggle = async () => {
         const { assetType, asset } = req.body

         const exists = await likeRepo.find({
            assetType: assetType,
            assetUrl: asset.assetUrl,
            provider: asset.provider,
            user: token
         })

         if (exists) {
            await exists.delete()
         } else {
            await likeRepo.create({
               assetType: assetType,
               assetUrl: asset.assetUrl,
               provider: asset.provider,
               asset: JSON.stringify(asset),
               user: token
            })
         }

         return res.status(200).send(await likeRepo.list(assetType, token))
      }

      switch (req.method) {
         case 'GET':
            return List()

         case 'POST':
            return Toggle()

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
