import RangeSlider from '@components/ui/RangeSlider'
import { trans } from '@lib/utils'
import { useRouter } from 'next/router'
import React from 'react'

export const imagesMinHeightFilter = {
   name: 'minHeight',
   label: trans('filters.minHeight.label')
}

const { name, label } = imagesMinHeightFilter

const MinHeightFilter = () => {
   const { query } = useRouter()

   return (
      <>
         <label className="mb-2.5 inline-block inline-flex items-center gap-2 text-sm text-gray-500">
            {label}
            <span className="rounded bg-gray-100 px-1.5 pb-1 pt-0.5 text-xxs text-gray-500">px</span>
         </label>
         <RangeSlider minName={name} min={0} max={10800} minValue={query.minHeight as never} step={200} />
      </>
   )
}

export default MinHeightFilter
