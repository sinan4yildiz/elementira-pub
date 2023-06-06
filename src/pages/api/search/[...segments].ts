import { AppProvidersType } from '@constants/app/types'
import { app, env } from '@constants/index'
import { errorLogger } from '@lib/serverUtils'
import { AllProvidersType } from '@lib/types'
import { filterFilled, isTrue, sortObject, trans } from '@lib/utils'
import mongoDB from '@middleware/mongodb'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { CacheRepository } from '@repository/index'
import SearchRepository from '@repository/searchRepository'
import FeederService from '@services/feederService'
import { SearchQueryObjectType } from '@services/searchService/types'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
   if (req.method !== 'POST') {
      return res.status(405).send({ error: trans('errors.methodNotAllowed') })
   }

   try {
      let searchResults = null

      const { segments } = req.query
      const cacheRepo = new CacheRepository()
      const searchRepo = new SearchRepository()
      const [assetType, provider] = segments as string[]
      const searchQuery = sortObject(filterFilled(req.body.searchQuery)) as SearchQueryObjectType
      const token = (await getToken({ req, secret: authOptions.secret }))?.sub as never

      /*
       * Fetch cached data
       * */
      if (isTrue(env.private.APP_CACHE)) {
         const cached = await cacheRepo.getBySearchQuery({ searchQuery, provider })

         if (cached) {
            searchResults = JSON.parse(cached.data)
         }
      }

      /*
       * Fetch fresh data if cache doesn't exist
       * */
      if (!searchResults) {
         const feederService = await new FeederService({
            provider: app.providers[assetType as keyof AppProvidersType][provider as never],
            searchQuery: searchQuery
         })

         searchResults = await feederService.searchResults()

         if (searchResults.assets.length && isTrue(env.private.APP_CACHE)) {
            await cacheRepo.store({
               searchQuery: JSON.stringify(searchQuery),
               provider: provider as keyof AllProvidersType,
               data: JSON.stringify(searchResults)
            })
         }
      }

      /*
       * Save search data
       * */
      await searchRepo.create({
         assetType: assetType,
         provider: provider,
         found: searchResults?.assets.length || 0,
         query: JSON.stringify(searchQuery),
         keyword: searchQuery.keyword,
         user: token
      })

      return res.status(200).json(searchResults)
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
