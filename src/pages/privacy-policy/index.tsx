import { Meta } from '@components/common'
import { env } from '@constants/index'
import IconScaleBalanced from '@icons/scale-balanced-duo.svg'
import { trans } from '@lib/utils'

const PagePrivacyPolicy = () => {
   return (
      <>
         <Meta
            title={trans('pages.privacyPolicy.metaTitle')}
            description={trans('pages.privacyPolicy.metaDescription')}
         />
         <section className="mx-auto my-10 px-4 lg:max-w-screen-lg">
            <IconScaleBalanced className="mb-4 w-8 fill-blue-600" />
            <h1 className="mb-4 flex items-center gap-4 text-2xl font-semibold text-black md:text-4xl">
               {trans('pages.privacyPolicy.metaTitle')}
            </h1>
            <article className="text-md font-light text-gray-700 [&>h2]:mb-1 [&>h2]:mt-4 [&>h2]:text-lg [&>h2]:font-medium [&>h2]:text-black [&>p]:mb-2 [&>ul]:mb-2 [&>ul]:list-inside [&>ul]:list-disc [&>ul]:pl-4">
               <p>
                  We take your privacy seriously and are committed to protecting your personal information. This Privacy
                  Policy explains how we collect, use, and disclose your personal information when you use our website
                  or services.
               </p>

               <h2>Information We Collect</h2>
               <p>
                  When you use our website or services, we may collect personal information, such as your name, email
                  address, postal address, and telephone number. We may also collect non-personal information, such as
                  your IP address, browser type, and operating system.
               </p>

               <h2>How We Use Your Information</h2>
               <p>We may use your personal information to:</p>
               <ul>
                  <li>Provide you with our services</li>
                  <li>Respond to your inquiries and requests</li>
                  <li>Send you newsletters, marketing emails, and other communications</li>
                  <li>Improve our website and services</li>
                  <li>Analyze user behavior and preferences</li>
                  <li>Comply with legal obligations</li>
               </ul>
               <p>
                  We will not sell or rent your personal information to third parties for their marketing purposes
                  without your consent.
               </p>

               <h2>Disclosure of Your Information</h2>
               <p>We may disclose your personal information to third parties for the following purposes:</p>
               <ul>
                  <li>To provide you with our services</li>
                  <li>To comply with legal obligations</li>
                  <li>To enforce our policies and terms of service</li>
                  <li>To protect our rights, property, or safety, or the rights, property, or safety of others</li>
               </ul>
               <p>
                  We may also share non-personal information with third parties for marketing, advertising, or other
                  purposes.
               </p>

               <h2>Security</h2>
               <p>
                  We use industry-standard security measures to protect your personal information from unauthorized
                  access, disclosure, or misuse. However, no data transmission over the internet or wireless network can
                  be guaranteed to be 100% secure. Therefore, we cannot guarantee the security of your personal
                  information.
               </p>

               <h2>Data Retention</h2>
               <p>
                  We will retain your personal information for as long as necessary to fulfill the purposes for which it
                  was collected or as required by applicable laws and regulations.
               </p>

               <h2>Your Rights</h2>
               <p>
                  You have the right to access, correct, or delete your personal information. You may also have the
                  right to restrict or object to the processing of your personal information. To exercise these rights,
                  please contact us using the information provided below.
               </p>

               <h2>Changes to this Policy</h2>
               <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page. We encourage you to review this Privacy Policy periodically.
               </p>

               <h2>Contact Us</h2>
               <p>
                  If you have any questions about this Privacy Policy, please contact us at{' '}
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

export default PagePrivacyPolicy
