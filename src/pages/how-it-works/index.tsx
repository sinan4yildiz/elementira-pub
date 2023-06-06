import { Meta } from '@components/common'
import IconRoute from '@icons/route-duo.svg'
import { trans } from '@lib/utils'

const PageHowItWorks = () => {
   return (
      <>
         <Meta title={trans('pages.howItWorks.metaTitle')} description={trans('pages.howItWorks.metaDescription')} />
         <section className="mx-auto my-10 px-4 lg:max-w-screen-lg">
            <IconRoute className="mb-4 w-7 fill-blue-600" />
            <h1 className="mb-4 flex items-center gap-4 text-2xl font-semibold text-black md:text-4xl">
               {trans('pages.howItWorks.metaTitle')}
            </h1>
            <article className="text-md font-light text-gray-700 [&>h2]:mb-1 [&>h2]:mt-4 [&>h2]:text-lg [&>h2]:font-medium [&>h2]:text-black [&>p]:mb-2 [&>ul]:mb-2 [&>ul]:list-inside [&>ul]:list-disc [&>ul]:pl-4">
               <p>Using Elementira is very easy. Follow the steps below and we will find what you are looking for.</p>

               <h2>1. Asset Type</h2>
               <p>Navigate to the asset type main page (e.g. images, video, music) via the main menu.</p>

               <h2>2. Make a Search</h2>
               <p>Enter a keyword that describes what you are looking for, or pick a featured one.</p>

               <h2>3. Filtering</h2>
               <p>Click/tap the `Filters` button, modify any filter according to your search and finally apply.</p>

               <h2>4. Sorting</h2>
               <p>Click/tap the `Sort` button and choose an option to sort the search results.</p>

               <h2>5. Collections</h2>
               <p>
                  Please sign in first to access collections. After sign in, click/tap `Save` button that can be seen on
                  every asset on the search results page.
               </p>

               <h2>6. Likes</h2>
               <p>
                  Also likes are only available to signed in users. `Like` button can be found just next to the `Save`
                  button.
               </p>

               <h2>7. Buy/Download</h2>
               <p>
                  Assets can only be downloaded or purchased from the website of the original owner of the asset. So you
                  can easily click/tap on any asset on the search results page and we will take you there.
               </p>
            </article>
         </section>
      </>
   )
}

export default PageHowItWorks
