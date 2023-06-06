import { errorLogger } from '@lib/serverUtils'
import { trans } from '@lib/utils'
import mongoDB from '@middleware/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
   const Create = async () => {
      const { name, stack, message, context, path } = req.body

      const log = await errorLogger({
         name: name,
         stack: stack,
         message: message,
         context: context,
         path: path
      })

      return res.status(200).send(log)
   }

   try {
      switch (req.method) {
         case 'POST':
            return Create()

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
