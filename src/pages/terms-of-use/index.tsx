import { Meta } from '@components/common'
import IconHandshake from '@icons/handshake-duo.svg'
import { trans } from '@lib/utils'

const PageTermsOfUse = () => {
   return (
      <>
         <Meta title={trans('pages.termsOfUse.metaTitle')} description={trans('pages.termsOfUse.metaDescription')} />
         <section className="mx-auto my-10 px-4 lg:max-w-screen-lg">
            <IconHandshake className="mb-4 w-8 fill-blue-600" />
            <h1 className="mb-4 flex items-center gap-4 text-2xl font-semibold text-black md:text-4xl">
               {trans('pages.termsOfUse.metaTitle')}
            </h1>
            <article className="text-md font-light text-gray-700 [&>h2]:mb-1 [&>h2]:mt-4 [&>h2]:text-lg [&>h2]:font-medium [&>h2]:text-black [&>p]:mb-2 [&>ul]:mb-2 [&>ul]:list-inside [&>ul]:list-disc [&>ul]:pl-4">
               <p>
                  These terms of use ("Agreement") govern your use of our website. By using our website, you agree to be
                  bound by this Agreement. If you do not agree to be bound by this Agreement, you may not use our
                  website.
               </p>

               <h2>Use of our website</h2>
               <p>
                  You may use our website only for lawful purposes and in accordance with this Agreement. You may not
                  use our website:
               </p>
               <ul>
                  <li>
                     In any way that violates any applicable federal, state, local, or international law or regulation
                  </li>
                  <li>
                     To transmit, or procure the sending of, any advertising or promotional material, including any
                     "junk mail," "chain letter," "spam," or any other similar solicitation
                  </li>
                  <li>
                     To impersonate or attempt to impersonate our company, a company employee, another user, or any
                     other person or entity
                  </li>
                  <li>
                     To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website,
                     or which, as determined by us, may harm our company or users of the website or expose them to
                     liability
                  </li>
               </ul>

               <h2>Intellectual property rights</h2>
               <p>
                  Our website and its entire contents, features, and functionality (including but not limited to all
                  information, software, text, displays, images, video, and audio, and the design, selection, and
                  arrangement thereof), are owned by us, our licensors, or other providers of such material and are
                  protected by United States and international copyright, trademark, patent, trade secret, and other
                  intellectual property or proprietary rights laws.
               </p>

               <p>
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly
                  perform, republish, download, store, or transmit any of the material on our website without our prior
                  written consent.
               </p>

               <h2>Disclaimer of warranties</h2>
               <p>
                  Our website is provided on an "as is" and "as available" basis, without any warranties of any kind,
                  express or implied, including but not limited to warranties of merchantability, fitness for a
                  particular purpose, non-infringement, or course of performance.
               </p>

               <h2>Limitation of liability</h2>
               <p>
                  In no event shall our company, its affiliates, or their respective officers, directors, employees,
                  agents, licensors, or suppliers be liable for any indirect, special, incidental, consequential, or
                  punitive damages arising out of or in connection with your use of our website.
               </p>

               <h2>Indemnification</h2>
               <p>
                  You agree to defend, indemnify, and hold harmless our company, its affiliates, and their respective
                  officers, directors, employees, agents, licensors, and suppliers from and against any claims,
                  liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable
                  attorneys' fees) arising out of or relating to your use of our website.
               </p>

               <h2>Termination</h2>
               <p>We may terminate your access to our website at any time, for any reason, without notice to you.</p>

               <h2>Governing law</h2>
               <p>
                  This Agreement shall be governed by and construed in accordance with the laws of United Kingdom,
                  without giving effect to any principles of conflicts of law.
               </p>

               <h2>Changes to this Agreement</h2>
               <p>
                  We reserve the right to update this Agreement at any time, without notice to you. Your continued use
                  of our website after any such changes constitutes your acceptance of the new Agreement.
               </p>
            </article>
         </section>
      </>
   )
}

export default PageTermsOfUse
