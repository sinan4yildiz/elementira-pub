import { routes } from '@constants/index'
import { errorLogger } from '@lib/serverUtils'
import { isFilled, route, trans } from '@lib/utils'
import mongoDB from '@middleware/mongodb'
import { UpdateProfileFormFieldsType } from '@pages/account/profile'
import { UserRepository } from '@repository/index'
import MailerService from '@services/mailerService'
import { NextApiRequest, NextApiResponse } from 'next'
import validator from 'validator'

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
   try {
      const userRepo = new UserRepository()
      const mailer = new MailerService()

      const Reset = async () => {
         const { email } = req.body,
            validationErrors: Partial<UpdateProfileFormFieldsType> = {}

         if (!validator.isEmail(email)) {
            validationErrors.email = trans('errors.validation.email')
         }

         if (isFilled(validationErrors)) {
            return res.status(422).send(validationErrors)
         }

         const user = await userRepo.find({ email: email })

         if (user) {
            const password = (Math.random() + 1).toString(36).substring(2)

            await user.updateOne({ password: password })

            await mailer.send({
               to: email,
               subject: trans('pages.resetPassword.emailTemplate.subject'),
               html: trans('pages.resetPassword.emailTemplate.content', {
                  name: user.fullName,
                  password: password,
                  link: decodeURIComponent(
                     route({ path: routes.page.account.signIn, params: { email: email }, host: true })
                  )
               })
            })
         }

         return res.status(200).send({})
      }

      switch (req.method) {
         case 'POST':
            return Reset()

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
