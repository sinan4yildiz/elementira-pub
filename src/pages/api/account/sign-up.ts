import { errorLogger } from '@lib/serverUtils'
import { isFilled, trans } from '@lib/utils'
import mongoDB from '@middleware/mongodb'
import { SignUpFormFieldsType } from '@pages/account/sign-up'
import { UserRepository } from '@repository/index'
import { NextApiRequest, NextApiResponse } from 'next'
import validator from 'validator'

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
   if (req.method !== 'POST') return res.status(405).send({ error: trans('errors.methodNotAllowed') })

   const userRepo = new UserRepository()

   try {
      const { fullName, email, password } = req.body,
         validationErrors: Partial<SignUpFormFieldsType> = {}

      if (!validator.isLength(fullName, { min: 6 })) {
         validationErrors.fullName = trans('errors.validation.fullName')
      }

      if (!validator.isEmail(email)) {
         validationErrors.email = trans('errors.validation.email')
      } else if (await userRepo.getUserByEmail(email)) {
         validationErrors.email = trans('errors.validation.emailRegistered')
      }

      if (!validator.isLength(password, { min: 6 })) {
         validationErrors.password = trans('errors.validation.password')
      }

      if (isFilled(validationErrors)) {
         return res.status(422).send(validationErrors)
      }

      const createdUser = await userRepo.create({
         fullName: fullName,
         email: email,
         password: password,
         provider: 'credentials',
         providerAccountId: null
      })

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
