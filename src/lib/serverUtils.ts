/*
 * Centralized error handler function
 *
 * */

import { env } from '@constants/index'
import { LogSchemaInterface } from '@models/logModel'
import { LogRepository } from '@repository/index'

export async function errorLogger(error: Omit<LogSchemaInterface, 'createdAt'>): Promise<boolean> {
   try {
      if (!error.name || !error.message) return false

      if (error.path) error.path = error.path.replace(env.public.APP_URL as string, '')

      const logRepo = new LogRepository()

      await logRepo.create({
         name: error.name,
         stack: error.stack,
         message: error.message,
         context: error.context,
         path: error.path
      })

      return true
   } catch (e) {
      console.error(e)

      return false
   }
}
