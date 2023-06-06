import SMTPTransport from 'nodemailer/lib/smtp-transport'

export interface MailerServiceInterface {
   send(data: MailerSendDataType): Promise<SMTPTransport.SentMessageInfo>
}

export type MailerSendDataType = {
   to: string
   subject: string
   html: string
}
