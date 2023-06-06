import { errorLogger } from '@lib/serverUtils'
import { isFilled, titleCase, trans } from '@lib/utils'
import mongoDB from '@middleware/mongodb'
import { UserRepository } from '@repository/index'
import { NextApiRequest, NextApiResponse } from 'next'
import validator from 'validator'

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
   if (req.method !== 'POST') return res.status(405).send({ error: trans('errors.methodNotAllowed') })

   const userRepo = new UserRepository()

   try {
      const { email, password } = req.body,
         validationErrors: Partial<{ email: string; password: string }> = {}

      if (!validator.isEmail(email)) {
         validationErrors.email = trans('errors.validation.email')
      }

      if (validator.isEmpty(password)) {
         validationErrors.password = trans('errors.validation.passwordRequired')
      }

      if (isFilled(validationErrors)) {
         return res.status(422).send(validationErrors)
      }

      const user = await userRepo.getUserByEmail(email)

      if (user && user?.provider !== 'credentials') {
         return res.status(401).send({
            error: trans('errors.socialAuth.alreadySignedInWithSocial', {
               provider: titleCase(user.provider)
            })
         })
      }

      if (!(await userRepo.verifySignIn(email, password))) {
         return res.status(401).send({ error: trans('errors.invalidCredentials') })
      }

      return res.status(200).send({})
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
