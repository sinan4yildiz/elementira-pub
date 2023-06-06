import { errorLogger } from '@lib/serverUtils'
import { trans } from '@lib/utils'
import mongoDB from '@middleware/mongodb'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { SearchRepository } from '@repository/index'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
   const searchRepo = new SearchRepository()
   const session = await getServerSession(req, res, authOptions)
   const token = (await getToken({ req, secret: authOptions.secret }))?.sub as never

   if (!session || !token) {
      return res.status(401).send({})
   }

   const Recent = async () => {
      const recent = await searchRepo.recentSearches(req.query.assetType as string, token)

      return res.status(200).send(recent)
   }

   const Delete = async () => {
      const { assetType } = req.body

      await searchRepo.clearRecentSearches(assetType, token)

      return res.status(200).send({})
   }

   try {
      switch (req.method) {
         case 'GET':
            return Recent()

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
