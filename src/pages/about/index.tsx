import { Meta } from '@components/common'
import { env } from '@constants/index'
import IconScroll from '@icons/scroll-duo.svg'
import { trans } from '@lib/utils'

const PageAbout = () => {
   return (
      <>
         <Meta title={trans('pages.about.metaTitle')} description={trans('pages.about.metaDescription')} />
         <section className="mx-auto my-10 px-4 lg:max-w-screen-lg">
            <IconScroll className="mb-4 w-7 fill-blue-600" />
            <h1 className="mb-4 flex items-center gap-4 text-2xl font-semibold text-black md:text-4xl">
               {trans('pages.about.metaTitle')}
            </h1>
            <article className="text-md font-light text-gray-700 [&>h2]:mb-1 [&>h2]:mt-4 [&>h2]:text-lg [&>h2]:font-medium [&>h2]:text-black [&>p]:mb-2 [&>ul]:mb-2 [&>ul]:list-inside [&>ul]:list-disc [&>ul]:pl-4">
               <p>
                  Elementira is a stock element search engine that finds stock images, videos, music, sound effects,
                  graphics and templates for you on the leading platforms such as ShutterStock, Adobe Stock, 123RF,
                  Unsplash, Envato, Freepik.
               </p>

               <h2>Our Technology</h2>
               <p>
                  Each time a search is made, we scan over 50 websites simultaneously to find the best stock elements
                  for you. So you don't have to browse through many websites separately.
               </p>

               <h2>Licence</h2>
               <p>
                  Elementira is not the original owner of any content on the website. The license of each content is
                  governed by the license agreement of the original owner of the content.
               </p>

               <h2>How to contact us</h2>
               <p>
                  If you have any questions, comments, or concerns about our website, please feel free to contact us at{' '}
                  <a href={`mailto:${env.public.CONTACT_EMAIL}`} className="text-blue-600">
                     {env.public.CONTACT_EMAIL}
                  </a>
                  .
               </p>
            </article>
         </section>
      </>
   )
}

export default PageAbout
