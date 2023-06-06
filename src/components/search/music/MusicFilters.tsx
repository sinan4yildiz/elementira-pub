import {
   DurationFilter,
   GenreFilter,
   InstrumentFilter,
   LoopableFilter,
   MoodFilter,
   TempoFilter,
   VocalFilter
} from './filters'

const musicFilters = [
   GenreFilter,
   DurationFilter,
   LoopableFilter,
   MoodFilter,
   TempoFilter,
   VocalFilter,
   InstrumentFilter
]

const MusicFilters = () => {
   return (
      <ul className="grid divide-y">
         {musicFilters.map((Component, key) => (
            <li key={key} className="px-5 pb-5 pt-3.5">
               <Component />
            </li>
         ))}
      </ul>
   )
}

export default MusicFilters
