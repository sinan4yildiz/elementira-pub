import { Meta } from '@components/common'
import { Button } from '@components/ui'
import { env } from '@constants/index'
import { fetcher } from '@lib/utils'
import { NextRequest, NextResponse } from 'next/server'

const PagePlayground = () => {
   const foo = async () => {
      await fetcher({
         url: 'https://sinanyildiz.me',
         method: 'GET',
         mode: 'no-cors',
         headers: {
            Referer: 'https://google.com',
            origin: 'https://google.com',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/html',
            'User-Agent':
               'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
         }
      }).then(async response => {
         console.info(await response.text())
      })
   }

   return (
      <>
         <Meta title="Playground" />
         <section className="mx-auto my-10 px-4 lg:max-w-screen-lg">
            <Button onClick={foo}>Click</Button>
         </section>
      </>
   )
}

export async function getServerSideProps(req: NextRequest, res: NextResponse) {
   if (env.private.APP_ENV === 'production')
      return {
         notFound: true
      }

   return {
      props: {}
   }
}

export default PagePlayground
