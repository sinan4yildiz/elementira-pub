import { ColorFilter, ExcludeFilter, FileTypeFilter, LicenceFilter, OrientationFilter, TypeFilter } from './filters'

const graphicFilters = [OrientationFilter, TypeFilter, FileTypeFilter, ColorFilter, LicenceFilter, ExcludeFilter]

const GraphicFilters = () => {
   return (
      <ul className="grid divide-y">
         {graphicFilters.map((Component, key) => (
            <li key={key} className="px-5 pb-5 pt-3.5">
               <Component />
            </li>
         ))}
      </ul>
   )
}

export default GraphicFilters
