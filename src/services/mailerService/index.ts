import { env } from '@constants/index'
import { isTrue } from '@lib/utils'
import { MailerSendDataType, MailerServiceInterface } from '@services/mailerService/types'
import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

class MailerService implements MailerServiceInterface {
   public readonly options: SMTPTransport.Options

   constructor() {
      this.options = {
         host: env.private.SMTP_HOST,
         port: parseInt(env.private.SMTP_PORT as string),
         secure: isTrue(env.private.SMTP_SSL),
         auth: {
            user: env.private.SMTP_USERNAME,
            pass: env.private.SMTP_PASSWORD
         }
      }
   }

   async send(data: MailerSendDataType): Promise<SMTPTransport.SentMessageInfo> {
      const transporter = nodemailer.createTransport({
         ...this.options
      })

      return await transporter.sendMail({
         from: {
            name: env.private.SMTP_FROM_NAME as string,
            address: env.private.SMTP_FROM_ADDRESS as string
         },
         ...data
      })
   }
}

export default MailerService
