import { Meta } from '@components/common'
import IconCookieBite from '@icons/cookie-bite-duo.svg'
import { trans } from '@lib/utils'

const PageCookies = () => {
   return (
      <>
         <Meta title={trans('pages.cookies.metaTitle')} description={trans('pages.cookies.metaDescription')} />
         <section className="mx-auto my-10 px-4 lg:max-w-screen-lg">
            <IconCookieBite className="mb-4 w-7 fill-blue-600" />
            <h1 className="mb-4 flex items-center gap-4 text-2xl font-semibold text-black md:text-4xl">
               {trans('pages.cookies.metaTitle')}
            </h1>
            <article className="text-md font-light text-gray-700 [&>h2]:mb-1 [&>h2]:mt-4 [&>h2]:text-lg [&>h2]:font-medium [&>h2]:text-black [&>p]:mb-2 [&>ul]:mb-2 [&>ul]:list-inside [&>ul]:list-disc [&>ul]:pl-4">
               <p>
                  This policy explains how we use cookies on our website. By using our website, you consent to our use
                  of cookies in accordance with this policy.
               </p>

               <h2>What are cookies?</h2>
               <p>
                  Cookies are small text files that are placed on your device when you visit a website. They are widely
                  used to make websites work more efficiently, as well as to provide information to the owners of the
                  website.
               </p>

               <h2>How do we use cookies?</h2>
               <p>We use cookies to:</p>
               <ul>
                  <li>Remember your preferences and settings</li>
                  <li>Enable certain functions of our website</li>
                  <li>Analyze how our website is used and improve its performance</li>
                  <li>Provide relevant advertisements to you based on your browsing behavior</li>
               </ul>

               <h2>What types of cookies do we use?</h2>
               <p>We use both session cookies and persistent cookies.</p>

               <p>
                  Session cookies are temporary cookies that are stored on your device until you close your browser.
                  They are used to enable certain functions of our website, such as keeping you logged in.
               </p>

               <p>
                  Persistent cookies are cookies that are stored on your device for a longer period of time. They are
                  used to remember your preferences and settings, as well as to analyze how our website is used.
               </p>

               <p>
                  We also use third-party cookies, which are cookies that are set by a domain other than our website. We
                  use third-party cookies to provide relevant advertisements to you based on your browsing behavior.
               </p>

               <h2>How can you control cookies?</h2>
               <p>
                  Most web browsers allow you to control cookies through their settings. You can choose to accept or
                  reject cookies, as well as to delete cookies that have already been stored on your device.
               </p>

               <p>
                  Please note that if you choose to reject cookies, you may not be able to use certain functions of our
                  website.
               </p>

               <h2>Changes to this policy</h2>
               <p>
                  We reserve the right to update this policy at any time. We encourage you to check this policy
                  regularly for updates.
               </p>
            </article>
         </section>
      </>
   )
}

export default PageCookies
