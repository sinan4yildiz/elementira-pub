import app from '@constants/app'
import { errorLogger } from '@lib/serverUtils'
import { fetcher, isFilled, trans } from '@lib/utils'
import mongoDB from '@middleware/mongodb'
import { AutocompleteRepository } from '@repository/index'
import { AutocompleteParamsType } from '@services/autocompleteService/types'
import { NextApiRequest, NextApiResponse } from 'next'

const controller = async (req: NextApiRequest, res: NextApiResponse) => {
   try {
      const autocompleteRepo = new AutocompleteRepository()
      const { assetType, keyword } = req.query as Required<AutocompleteParamsType>

      if (!app.assets.hasOwnProperty(assetType as string)) {
         throw Error(trans('errors.generic'))
      }

      const existing = await autocompleteRepo.find({
         assetType: assetType,
         keyword: keyword
      })

      if (existing) {
         return res.status(200).json(JSON.parse(existing.results))
      }

      const autocomplete = app.assets[assetType].autocomplete

      const results = await fetcher({
         url: autocomplete.searchUrl({ keyword: keyword }),
         method: autocomplete.method,
         headers: Object.assign(autocomplete.headers, {
            'User-Agent':
               'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
         })
      }).then(async response => {
         const results = await response.json()

         if (!response.ok) {
            return []
         }

         return autocomplete.results(results)
      })

      if (keyword && isFilled(results)) {
         await autocompleteRepo.create({
            assetType: assetType,
            keyword: keyword,
            results: JSON.stringify(results)
         })
      }

      return res.status(200).json(results)
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
