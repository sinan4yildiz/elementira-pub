import { Meta } from '@components/common'
import IconCertificate from '@icons/certificate-duo.svg'
import { trans } from '@lib/utils'

const PageLicence = () => {
   return (
      <>
         <Meta title={trans('pages.licence.metaTitle')} description={trans('pages.licence.metaDescription')} />
         <section className="mx-auto my-10 px-4 lg:max-w-screen-lg">
            <IconCertificate className="mb-4 w-6 fill-blue-600" />
            <h1 className="mb-4 flex items-center gap-4 text-2xl font-semibold text-black md:text-4xl">
               {trans('pages.licence.metaTitle')}
            </h1>
            <article className="text-md font-light text-gray-700 [&>h2]:mb-1 [&>h2]:mt-4 [&>h2]:text-lg [&>h2]:font-medium [&>h2]:text-black [&>p]:mb-2 [&>ul]:mb-2 [&>ul]:list-inside [&>ul]:list-disc [&>ul]:pl-4">
               <p>
                  This license policy ("Policy") governs your use of the stock images, videos, graphics, music, sound
                  effects and templates ("Content") provided on our website. By downloading or using any Content, you
                  agree to be bound by this Policy. If you do not agree to be bound by this Policy, you may not download
                  or use any Content.
               </p>

               <h2>Licence Ownership</h2>
               <p>
                  Elementira is not the original owner of any content on the website. The license of each content is
                  governed by the license agreement of the original owner of the content.
               </p>

               <h2>License Types</h2>
               <p>We offer the following license types for our Content:</p>
               <ul>
                  <li>
                     Royalty-Free License: This license allows you to use the Content in multiple projects, without
                     having to pay any additional fees. However, there are some restrictions on how you can use the
                     Content, as outlined below.
                  </li>
                  <li>
                     Editorial License: This license allows you to use the Content in editorial or journalistic
                     projects, such as news articles or documentaries. However, you may not use the Content for
                     commercial purposes, such as advertising or promotional materials.
                  </li>
               </ul>

               <h2>License Restrictions</h2>
               <p>Regardless of the license type, you may not:</p>
               <ul>
                  <li>Use the Content in a way that is defamatory, libelous, or obscene</li>
                  <li>Use the Content to promote illegal activities or products</li>
                  <li>Use the Content in a way that infringes on any third-party intellectual property rights</li>
                  <li>
                     Resell or redistribute the Content in its original form, or use it to create competing products or
                     services
                  </li>
                  <li>Claim ownership or authorship of the Content</li>
               </ul>

               <h2>Attribution</h2>
               <p>
                  If you use the Content in a public project, you must give attribution to the original publisher or
                  author. The attribution must be in a clear and visible location, and include the author's name and a
                  link to the website.
               </p>

               <h2>Disclaimer of Warranties</h2>
               <p>
                  The Content is provided on an "as is" basis, without any warranties of any kind, express or implied,
                  including but not limited to warranties of merchantability, fitness for a particular purpose,
                  non-infringement, or course of performance.
               </p>

               <h2>Limitation of Liability</h2>
               <p>
                  In no event shall our company, its affiliates, or their respective officers, directors, employees,
                  agents, licensors, or suppliers be liable for any indirect, special, incidental, consequential, or
                  punitive damages arising out of or in connection with your use of the Content.
               </p>

               <h2>Termination</h2>
               <p>We may terminate your access to the Content at any time, for any reason, without notice to you.</p>

               <h2>Governing Law</h2>
               <p>
                  This Policy shall be governed by and construed in accordance with the laws of United Kingdom, without
                  giving effect to any principles of conflicts of law.
               </p>

               <h2>Changes to this Policy</h2>
               <p>
                  We reserve the right to update this Policy at any time, without notice to you. Your continued use of
                  the Content after any such changes constitutes your acceptance of the new Policy.
               </p>
            </article>
         </section>
      </>
   )
}

export default PageLicence
