import { env } from '@constants/index'
import { fetcher, prefixKeys } from '@lib/utils'
import { ProxyRepository } from '@repository/index'
import {
   FeederServiceInterface,
   FeederServicePropsType,
   FeederServiceScrapersType
} from '@services/feederService/types'
import axios from 'axios'
import * as url from 'url'

class FeederService implements FeederServiceInterface {
   public readonly props

   constructor({ provider, searchQuery, scraper }: FeederServicePropsType) {
      this.props = {
         provider,
         searchQuery,
         scraper
      }
   }

   get searchUrl() {
      return this.props.provider.searchUrl(this.props.searchQuery as never)
   }

   async viaScrapingBee() {
      return await fetcher({
         url: 'https://app.scrapingbee.com/api/v1/',
         data: {
            api_key: env.private.SCRAPING_BEE_API_KEY,
            url: this.searchUrl,
            render_js: 'false',
            forward_headers: 'true'
         },
         headers: prefixKeys(this.props.provider.headers, 'Spb-') as HeadersInit
      }).then(async response => {
         return this.props.provider.json ? await response.json() : await response.text()
      })
   }

   async viaScraperApi() {
      return await fetcher({
         url: 'https://api.scraperapi.com',
         data: {
            api_key: env.private.SCRAPER_API_KEY,
            url: this.searchUrl,
            render: 'false',
            keep_headers: 'true'
         },
         headers: this.props.provider.headers
      }).then(async response => {
         return this.props.provider.json ? await response.json() : await response.text()
      })
   }

   async viaBrightDataCenter() {
      const proxy = url.parse(env.private.BRIGHT_DATA_CENTER_URL as string)
      const [username, password] = proxy.auth!.split(':')

      return await axios
         .get(this.searchUrl, {
            headers: this.props.provider.headers,
            proxy: {
               protocol: proxy.protocol as never,
               host: proxy.hostname as never,
               port: proxy.port as never,
               auth: {
                  username: username,
                  password: password
               }
            }
         })
         .then(response => {
            return response.data
         })
   }

   async viaBrightDataUnlocker() {
      const proxy = url.parse(env.private.BRIGHT_DATA_UNLOCKER_URL as string)
      const [username, password] = proxy.auth!.split(':')

      return await axios
         .get(this.searchUrl, {
            headers: this.props.provider.headers,
            proxy: {
               protocol: proxy.protocol as never,
               host: proxy.hostname as never,
               port: proxy.port as never,
               auth: {
                  username: username,
                  password: password
               }
            }
         })
         .then(response => {
            return response.data
         })
   }

   async viaNativeFetcher() {
      return await fetcher({
         url: this.searchUrl,
         method: this.props.provider.method,
         headers: {
            ...this.props.provider.headers,
            'User-Agent':
               'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
         }
      }).then(async response => {
         return this.props.provider.json ? await response.json() : await response.text()
      })
   }

   async getSource(scraper: keyof FeederServiceScrapersType) {
      switch (scraper) {
         case 'ScrapingBee':
            return this.parser(await this.viaScrapingBee())

         case 'ScraperApi':
            return this.parser(await this.viaScraperApi())

         case 'BrightDataCenter':
            return this.parser(await this.viaBrightDataCenter())

         case 'BrightDataUnlocker':
            return this.parser(await this.viaBrightDataUnlocker())

         default:
            return this.parser(await this.viaNativeFetcher())
      }
   }

   parser(source: any) {
      return this.props.provider.searchResults(source, this.props.searchQuery as never)
   }

   async searchResults() {
      if (this.props.scraper) {
         return this.getSource(this.props.scraper)
      }

      if (this.props.provider.proxy) {
         const proxyRepo = new ProxyRepository()

         const providerProxy = await proxyRepo.find({ provider: this.props.provider.name })

         return this.getSource(providerProxy?.proxy)
      }

      return this.getSource('Native')
   }
}

export default FeederService
