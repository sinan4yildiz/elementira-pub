import { formatDuration } from '@lib/utils'
import React, { useEffect, useState } from 'react'

type PropsType = {
   minName?: string
   maxName?: string
   minValue?: number
   maxValue?: number
   min: number
   max: number
   step?: number
   dual?: boolean
   format?: 'time'
   onChange?: (...args: any[]) => any
}

const formatter: {
   [K in NonNullable<PropsType['format'] | 'default'>]: (val: number) => any
} = {
   default: (val: number) => val,
   time: (val: number) => formatDuration(val)
}

const RangeSlider = ({ minName, maxName, minValue, maxValue, min, max, step, dual, format }: PropsType) => {
   const [minVal, setMinVal] = useState(min)
   const [maxVal, setMaxVal] = useState(max)

   const formatVal = (val: number) => {
      return formatter[format || 'default'](val)
   }

   useEffect(() => {
      setMinVal(minValue || min)
      setMaxVal(maxValue || max)
   }, [minValue, maxValue])

   return (
      <div className="relative flex items-center justify-between gap-3">
         <div className="w-12 rounded-md bg-gray-100 py-1 text-center text-xxs font-medium">{formatVal(minVal)}</div>
         <div className="relative h-2.5 w-full rounded bg-gray-200/75">
            <input
               type="range"
               name={minVal > 0 ? minName : ''}
               min={min}
               max={max}
               value={minVal}
               className="absolute left-0 right-0"
               onChange={e => setMinVal(Math.min(Number(e.target.value), maxVal))}
               step={step}
            />
            {dual && (
               <>
                  <input
                     type="range"
                     name={maxVal > 0 && max !== maxVal ? maxName : ''}
                     min={min}
                     max={max}
                     value={maxVal}
                     className="absolute left-0 right-0"
                     onChange={e => setMaxVal(Math.max(Number(e.target.value), minVal))}
                     step={step}
                  />
               </>
            )}
         </div>
         {dual && (
            <div className="w-12 rounded-md bg-gray-100 py-1 text-center text-xxs font-medium">{formatVal(maxVal)}</div>
         )}
      </div>
   )
}

export default RangeSlider
