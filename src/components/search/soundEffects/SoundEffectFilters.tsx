import { CategoryFilter, DurationFilter } from './filters'

const filters = [CategoryFilter, DurationFilter]

const VideoFilters = () => {
   return (
      <ul className="grid divide-y">
         {filters.map((Component, key) => (
            <li key={key} className="px-5 pb-5 pt-3.5">
               <Component />
            </li>
         ))}
      </ul>
   )
}

export default VideoFilters
