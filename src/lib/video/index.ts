import {
   _123RF,
   AdobeStock,
   DepositPhotos,
   EnvatoVideo,
   GettyImages,
   iStockPhoto,
   Pixabay,
   ShutterStock,
   Videvo
} from '@lib/video/providers'
import { VideoProvidersType } from '@lib/video/types'
import videoAutocomplete from './autocomplete'
import videoRelatedKeywords from './relatedKeywords'

const videoProviders: VideoProvidersType = {
   ShutterStock: ShutterStock,
   Pixabay: Pixabay,
   AdobeStock: AdobeStock,
   EnvatoVideo: EnvatoVideo,
   DepositPhotos: DepositPhotos,
   GettyImages: GettyImages,
   iStockPhoto: iStockPhoto,
   _123RF: _123RF,
   Videvo: Videvo
}

export { videoProviders, videoAutocomplete, videoRelatedKeywords }
