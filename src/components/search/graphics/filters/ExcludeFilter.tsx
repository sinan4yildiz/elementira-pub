import { graphicsExcludeFilter } from '@components/search/graphics/filters/objects'
import { trans } from '@lib/utils'
import { useRouter } from 'next/router'
import React from 'react'

const { name, label } = graphicsExcludeFilter

const ExcludeFilter = () => {
   const { query } = useRouter()

   return (
      <>
         <label htmlFor="filter-exclude" className="mb-3 inline-block text-sm text-gray-500">
            {label}
         </label>
         <input
            type="text"
            name={name}
            defaultValue={query.exclude}
            id="filter-exclude"
            placeholder={trans('filters.exclude.placeholder')}
            className="border-1 block w-full rounded-md border-gray-300 px-4 py-3 text-sm placeholder-gray-400 !ring-0 transition placeholder:font-light focus:border-gray-400"
         />
      </>
   )
}

export default ExcludeFilter
