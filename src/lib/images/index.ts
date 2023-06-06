import {
   _123RF,
   AdobeStock,
   BigStockPhoto,
   CanStockPhoto,
   DepositPhotos,
   DreamsTime,
   EnvatoPhotos,
   Freepik,
   GettyImages,
   iStockPhoto,
   Pexels,
   Pixabay,
   ShutterStock,
   Unsplash
} from '@lib/images/providers'
import { ImageProvidersType } from '@lib/images/types'
import imageAutocomplete from './autocomplete'
import imageRelatedKeywords from './relatedKeywords'

const imageProviders: ImageProvidersType = {
   ShutterStock: ShutterStock,
   Unsplash: Unsplash,
   Pexels: Pexels,
   Pixabay: Pixabay,
   EnvatoPhotos: EnvatoPhotos,
   DepositPhotos: DepositPhotos,
   AdobeStock: AdobeStock,
   iStockPhoto: iStockPhoto,
   Freepik: Freepik,
   _123RF: _123RF,
   GettyImages: GettyImages,
   DreamsTime: DreamsTime,
   BigStockPhoto: BigStockPhoto,
   CanStockPhoto: CanStockPhoto
}

export { imageProviders, imageAutocomplete, imageRelatedKeywords }
