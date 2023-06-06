import { errorLogger } from '@lib/serverUtils'
import { isFilled, trans } from '@lib/utils'
import mongoDB from '@middleware/mongodb'
import { UpdateProfileFormFieldsType } from '@pages/account/profile'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { UserRepository } from '@repository/index'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import validator from 'validator'

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
   try {
      const userRepo = new UserRepository()
      const session = await getServerSession(req, res, authOptions)
      const token = (await getToken({ req, secret: authOptions.secret }))?.sub as never

      if (!session || !token) {
         return res.status(401).send({})
      }

      const Update = async () => {
         const { fullName, email, password } = req.body,
            validationErrors: Partial<UpdateProfileFormFieldsType> = {}

         if (!validator.isLength(fullName, { min: 6 })) {
            validationErrors.fullName = trans('errors.validation.fullName')
         }

         if (!validator.isEmail(email)) {
            validationErrors.email = trans('errors.validation.email')
         } else if (await userRepo.find({ _id: { $ne: token }, email: email })) {
            validationErrors.email = trans('errors.validation.emailRegistered')
         }

         if (password && !validator.isLength(password, { min: 6 })) {
            validationErrors.password = trans('errors.validation.password')
         }

         if (isFilled(validationErrors)) {
            return res.status(422).send(validationErrors)
         }

         const updatedUser = await userRepo.update(token, {
            fullName: fullName,
            email: email
         })

         if (password) {
            await updatedUser.updateOne({ password: password })
         }

         return res.status(200).send({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email
         })
      }

      switch (req.method) {
         case 'POST':
            return Update()

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
