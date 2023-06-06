import {
   _123RF,
   AdobeStock,
   DepositPhotos,
   DreamsTime,
   EnvatoGraphics,
   Freepik,
   ShutterStock
} from '@lib/graphics/providers'
import { GraphicProvidersType } from '@lib/graphics/types'
import graphicAutocomplete from './autocomplete'
import graphicRelatedKeywords from './relatedKeywords'

const graphicProviders: GraphicProvidersType = {
   ShutterStock: ShutterStock,
   Freepik: Freepik,
   DepositPhotos: DepositPhotos,
   EnvatoGraphics: EnvatoGraphics,
   AdobeStock: AdobeStock,
   _123RF: _123RF,
   DreamsTime: DreamsTime
}

export { graphicProviders, graphicAutocomplete, graphicRelatedKeywords }
