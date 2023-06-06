import { Meta } from '@components/common'
import { env } from '@constants/index'
import IconPaperPlane from '@icons/paper-plane-duo.svg'
import { trans } from '@lib/utils'

const PageContact = () => {
   return (
      <>
         <Meta title={trans('pages.contact.metaTitle')} description={trans('pages.contact.metaDescription')} />
         <section className="mx-auto my-10 px-4 lg:max-w-screen-lg">
            <IconPaperPlane className="mb-4 w-7 fill-blue-600" />
            <h1 className="mb-4 flex items-center gap-4 text-2xl font-semibold text-black md:text-4xl">
               {trans('pages.contact.metaTitle')}
            </h1>

            <article className="text-md font-light text-gray-700 [&>h2]:mb-1 [&>h2]:mt-4 [&>h2]:text-lg [&>h2]:font-medium [&>h2]:text-black [&>p]:mb-2 [&>ul]:mb-2 [&>ul]:list-inside [&>ul]:list-disc [&>ul]:pl-4">
               <p>
                  If you have any questions, comments, or concerns about our website, please feel free to contact us at{' '}
                  <a href={`mailto:${env.public.CONTACT_EMAIL}`} className="text-blue-600">
                     {env.public.CONTACT_EMAIL}
                  </a>
                  .
               </p>

               <p>We will do our best to respond to your inquiry as soon as possible.</p>

               <em className="mt-6 block">Thank you for using Elementira!</em>
            </article>
         </section>
      </>
   )
}

export default PageContact
