import RangeSlider from '@components/ui/RangeSlider'
import { trans } from '@lib/utils'
import { useRouter } from 'next/router'
import React from 'react'

export const imagesMinWidthFilter = {
   name: 'minWidth',
   label: trans('filters.minWidth.label')
}

const { name, label } = imagesMinWidthFilter

const MinWidthFilter = () => {
   const { query } = useRouter()

   return (
      <>
         <label className="mb-2.5 inline-block inline-flex items-center gap-2 text-sm text-gray-500">
            {label}
            <span className="rounded bg-gray-100 px-1.5 pb-1 pt-0.5 text-xxs text-gray-500">px</span>
         </label>
         <RangeSlider minName={name} min={0} max={19200} minValue={query.minWidth as never} step={200} />
      </>
   )
}

export default MinWidthFilter
